const prisma = require("../utils/prisma");

function upsertMission(data) {
  return prisma.ourmission.upsert({
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
  upsertMission,
};
