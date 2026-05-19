const prisma = require("../utils/prisma");

function upsertGroupHistory(data) {
  return prisma.grouphistory.upsert({
    where: {
      pageId: data.pageId,
    },
    update: {
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
    },
    create: data,
  });
}

module.exports = {
  upsertGroupHistory,
};
