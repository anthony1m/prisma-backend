const redis = require("../src/redis");

const DEFAULT_CACHE_TTL_SECONDS = Number(process.env.CACHE_TTL_SECONDS || 300);

function redisIsReady() {
  return redis.isOpen && redis.isReady;
}

function normalizeTtl(ttlSeconds) {
  const ttl = Number(ttlSeconds || DEFAULT_CACHE_TTL_SECONDS);

  return Number.isFinite(ttl) && ttl > 0 ? Math.floor(ttl) : 300;
}

function cacheKey(...parts) {
  return parts
    .map((part) => encodeURIComponent(String(part ?? "all")))
    .join(":");
}

async function getJson(key) {
  if (!redisIsReady()) {
    return {
      hit: false,
      value: null,
    };
  }

  try {
    const cachedValue = await redis.get(key);

    if (cachedValue === null) {
      return {
        hit: false,
        value: null,
      };
    }

    return {
      hit: true,
      value: JSON.parse(cachedValue),
    };
  } catch (err) {
    console.error(`Redis cache read failed for ${key}:`, err);

    return {
      hit: false,
      value: null,
    };
  }
}

async function setJson(key, value, ttlSeconds) {
  if (!redisIsReady()) {
    return;
  }

  try {
    await redis.setEx(key, normalizeTtl(ttlSeconds), JSON.stringify(value));
  } catch (err) {
    console.error(`Redis cache write failed for ${key}:`, err);
  }
}

async function rememberJson(key, fetcher, ttlSeconds) {
  const cached = await getJson(key);

  if (cached.hit) {
    return cached.value;
  }

  const value = await fetcher();
  await setJson(key, value, ttlSeconds);

  return value;
}

async function deleteKeys(keys) {
  if (!redisIsReady()) {
    return;
  }

  const keysToDelete = (Array.isArray(keys) ? keys : [keys]).filter(Boolean);

  if (!keysToDelete.length) {
    return;
  }

  try {
    await redis.del(keysToDelete);
  } catch (err) {
    console.error("Redis cache delete failed:", err);
  }
}

async function deleteByPattern(pattern) {
  if (!redisIsReady()) {
    return;
  }

  try {
    const keys = [];

    for await (const key of redis.scanIterator({
      MATCH: pattern,
      COUNT: 100,
    })) {
      keys.push(key);
    }

    await deleteKeys(keys);
  } catch (err) {
    console.error(`Redis cache pattern delete failed for ${pattern}:`, err);
  }
}

async function deleteByPatterns(patterns) {
  await Promise.all(patterns.map((pattern) => deleteByPattern(pattern)));
}

module.exports = {
  cacheKey,
  deleteByPattern,
  deleteByPatterns,
  deleteKeys,
  rememberJson,
  setJson,
};
