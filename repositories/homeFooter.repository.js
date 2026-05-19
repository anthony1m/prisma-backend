const prisma = require("../utils/prisma");

function getHomeFooter() {
  return prisma.homefooter.findUnique({
    where: {
      id: 1,
    },
  });
}

function upsertHomeFooter(data) {
  return prisma.homefooter.upsert({
    where: {
      id: 1,
    },
    update: {
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
    },
    create: {
      id: 1,
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
    },
  });
}

module.exports = {
  getHomeFooter,
  upsertHomeFooter,
};
