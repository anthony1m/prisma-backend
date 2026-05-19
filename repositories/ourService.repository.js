const prisma = require("../utils/prisma");

function upsertOurService(data) {
  return prisma.ourservices.upsert({
    where: {
      pageId_title: {
        pageId: data.pageId,
        title: data.title,
      },
    },
    update: {
      description: data.description,
      imageURL: data.imageURL,
    },
    create: data,
  });
}

module.exports = {
  upsertOurService,
};
