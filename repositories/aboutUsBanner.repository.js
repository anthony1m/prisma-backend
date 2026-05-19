const prisma = require("../utils/prisma");

function getAboutUsBanner() {
  return prisma.aboutusbanner.findFirst({
    include: {
      page: true,
    },
  });
}

function upsertAboutUsBanner(data) {
  return prisma.aboutusbanner.upsert({
    where: {
      pageId: data.pageId,
    },
    update: {
      title: data.title,
      imageURL: data.imageURL,
    },
    create: data,
  });
}

module.exports = {
  getAboutUsBanner,
  upsertAboutUsBanner,
};
