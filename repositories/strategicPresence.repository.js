const prisma = require("../utils/prisma");
const {
  invalidateAboutUsCache,
  invalidateAboutUsCacheAfter,
  invalidateAfter,
  invalidatePagesCache,
  invalidateSearchCache,
} = require("../utils/contentCache");

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

function deleteStrategicPresence(id) {
  return invalidateAfter(
    prisma.strategicpresence.deleteMany({
      where: {
        id,
      },
    }),
    invalidateAboutUsCache,
    invalidatePagesCache,
    invalidateSearchCache
  );
}

module.exports = {
  deleteStrategicPresence,
  upsertStrategicPresence,
};
