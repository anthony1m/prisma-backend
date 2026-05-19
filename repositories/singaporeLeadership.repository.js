const prisma = require("../utils/prisma");

function upsertSingaporeLeadership(data) {
  return prisma.singaporeleadership.upsert({
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
  upsertSingaporeLeadership,
};
