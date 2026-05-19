const prisma = require("../utils/prisma");

function upsertStrategicPresence(data) {
  return prisma.strategicpresence.upsert({
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
  upsertStrategicPresence,
};
