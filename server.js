require("dotenv/config");

const app = require("./app");
const redis = require("./src/redis");

const PORT = process.env.PORT || 3000;

let server;

async function startServer() {
  const redisConnected = await redis.connectRedis();

  if (redisConnected) {
    console.log("Redis connected");
  } else {
    console.warn("Redis unavailable. Starting API without cache.");
  }

  server = app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
  });
}

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down...`);

  if (server) {
    server.close(async () => {
      await redis.disconnectRedis();
      process.exit(0);
    });
    return;
  }

  await redis.disconnectRedis();
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});
