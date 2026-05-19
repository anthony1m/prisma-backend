const prisma = require("../utils/prisma");

function listTheExpansions(pageId) {
  return prisma.theexpansion.findMany({
    where: pageId
      ? {
          pageId,
        }
      : undefined,
    orderBy: {
      id: "asc",
    },
  });
}

function upsertTheExpansion(data) {
  return prisma.theexpansion.upsert({
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
  listTheExpansions,
  upsertTheExpansion,
};
