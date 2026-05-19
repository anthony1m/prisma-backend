const prisma = require("../utils/prisma");

function upsertStrategicObjective(data) {
  return prisma.strategicobjectives.upsert({
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
  upsertStrategicObjective,
};
