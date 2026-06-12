const prisma = require("../utils/prisma");
const {
  invalidateAfter,
  invalidateHomeCache,
  invalidateHomeCacheAfter,
  invalidatePagesCache,
  invalidateSearchCache,
} = require("../utils/contentCache");

function upsertOurService(data) {
  return invalidateHomeCacheAfter(
    prisma.ourservices.upsert({
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
    })
  );
}

function deleteOurService(id) {
  return invalidateAfter(
    prisma.ourservices.deleteMany({
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
  deleteOurService,
  upsertOurService,
};
