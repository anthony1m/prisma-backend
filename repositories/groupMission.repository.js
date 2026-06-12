const prisma = require("../utils/prisma");
const {
  invalidateAfter,
  invalidateHomeCache,
  invalidateHomeCacheAfter,
  invalidatePagesCache,
  invalidateSearchCache,
} = require("../utils/contentCache");

function upsertGroupMission(data) {
  return invalidateHomeCacheAfter(
    prisma.groupmission.upsert({
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

function deleteGroupMission(id) {
  return invalidateAfter(
    prisma.groupmission.deleteMany({
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
  deleteGroupMission,
  upsertGroupMission,
};
