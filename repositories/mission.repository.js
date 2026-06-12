const prisma = require("../utils/prisma");
const {
  invalidateAfter,
  invalidateHomeCache,
  invalidateHomeCacheAfter,
  invalidatePagesCache,
  invalidateSearchCache,
} = require("../utils/contentCache");

function upsertMission(data) {
  return invalidateHomeCacheAfter(
    prisma.ourmission.upsert({
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

function deleteMission(id) {
  return invalidateAfter(
    prisma.ourmission.deleteMany({
      where: {
        id,
      },
    }),
    invalidateHomeCache,
    invalidatePagesCache,
    invalidateSearchCache
  );
}

module.exports = {
  deleteMission,
  upsertMission,
};
