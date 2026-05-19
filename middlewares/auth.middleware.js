const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function getBearerToken(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return null;
  }

  return token;
}

async function getAuthenticatedUser(req) {
  const token = getBearerToken(req);

  if (!token) {
    throw createError("Authentication token is required", 401);
  }

  if (!process.env.JWT_SECRET) {
    throw createError("JWT_SECRET is not configured", 500);
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createError("Authentication token expired", 401);
    }

    throw createError("Invalid authentication token", 401);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    throw createError("User not found", 401);
  }

  return user;
}

async function protect(req, res, next) {
  try {
    req.user = await getAuthenticatedUser(req);
    next();
  } catch (error) {
    next(error);
  }
}

async function requireAdmin(req, res, next) {
  try {
    if (!req.user) {
      req.user = await getAuthenticatedUser(req);
    }

    if (req.user.role !== "ADMIN") {
      throw createError("Admin access required", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
}

function requireAdminForPost(req, res, next) {
  if (req.method !== "POST") {
    next();
    return;
  }

  requireAdmin(req, res, next);
}

module.exports = {
  protect,
  requireAdmin,
  requireAdminForPost,
};
