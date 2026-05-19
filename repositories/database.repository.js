const prisma = require("../utils/prisma");

function disconnect() {
  return prisma.$disconnect();
}

module.exports = {
  disconnect,
};
