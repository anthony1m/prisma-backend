const prisma = require("../utils/prisma");
const { cacheKey, deleteKeys, rememberJson } = require("../utils/cache");

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  emailVerified: true,
};

function findByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

function findPublicById(id) {
  return rememberJson(
    cacheKey("user", id),
    () =>
      prisma.user.findUnique({
        where: {
          id,
        },
        select: publicUserSelect,
      }),
    60
  );
}

async function createUser(data) {
  const user = await prisma.user.create({
    data,
    select: publicUserSelect,
  });

  await deleteKeys(cacheKey("user", user.id));

  return user;
}

async function makeAdminByEmail(email) {
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      role: "ADMIN",
    },
    select: publicUserSelect,
  });

  await deleteKeys(cacheKey("user", user.id));

  return user;
}

async function markEmailVerifiedById(id) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      emailVerified: true,
    },
    select: publicUserSelect,
  });

  await deleteKeys(cacheKey("user", id));

  return user;
}

async function updatePasswordById(id, password) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
    select: publicUserSelect,
  });

  await deleteKeys(cacheKey("user", id));

  return user;
}

async function deleteUserById(id) {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  await deleteKeys(cacheKey("user", id));

  return user;
}

module.exports = {
  createUser,
  deleteUserById,
  findByEmail,
  findPublicById,
  markEmailVerifiedById,
  makeAdminByEmail,
  updatePasswordById,
};
