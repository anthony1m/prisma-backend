const prisma = require("../utils/prisma");
const { invalidateAboutUsCacheAfter } = require("../utils/contentCache");

function upsertStrategicPresence(data) {
  return invalidateAboutUsCacheAfter(
    prisma.strategicpresence.upsert({
      where: {
        pageId: data.pageId,
      },
      update: {
        title: data.title,
        description: data.description,
        imageURL: data.imageURL,
      },
      create: data,
    })
  );
}

module.exports = {
  upsertStrategicPresence,
};
