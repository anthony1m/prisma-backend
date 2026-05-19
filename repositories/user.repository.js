const prisma = require("../utils/prisma");

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
};

function findByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

function findPublicById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: publicUserSelect,
  });
}

function createUser(data) {
  return prisma.user.create({
    data,
    select: publicUserSelect,
  });
}

function makeAdminByEmail(email) {
  return prisma.user.update({
    where: {
      email,
    },
    data: {
      role: "ADMIN",
    },
    select: publicUserSelect,
  });
}

module.exports = {
  createUser,
  findByEmail,
  findPublicById,
  makeAdminByEmail,
};
