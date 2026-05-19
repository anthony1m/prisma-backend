const prisma = require("../utils/prisma");

function upsertOurValue(data) {
  return prisma.ourvalues.upsert({
    where: {
      pageId_title: {
        pageId: data.pageId,
        title: data.title,
      },
    },
    update: {
      description: data.description,
    },
    create: data,
  });
}

module.exports = {
  upsertOurValue,
};
