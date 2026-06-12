const { createClient } = require("redis");

const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6380",
  socket: {
    reconnectStrategy(retries) {
      if (retries > 3) {
        return false;
      }

      return Math.min(retries * 100, 1000);
    },
  },
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

let connectionPromise;

async function connectRedis() {
  if (redis.isReady) {
    return true;
  }

  if (!connectionPromise) {
    connectionPromise = redis
      .connect()
      .then(() => {
        connectionPromise = null;
        return true;
      })
      .catch((err) => {
        connectionPromise = null;
        console.error("Redis connection failed:", err);
        return false;
      });
  }

  return connectionPromise;
}

async function disconnectRedis() {
  if (!redis.isOpen) {
    return;
  }

  try {
    await redis.quit();
    connectionPromise = null;
  } catch (err) {
    console.error("Redis disconnect failed:", err);
  }
}

module.exports = redis;
module.exports.connectRedis = connectRedis;
module.exports.disconnectRedis = disconnectRedis;
