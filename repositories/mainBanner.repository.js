const prisma = require("../utils/prisma");
const {
  invalidateAfter,
  invalidateContactUsCache,
  invalidateHomeCache,
  invalidateHomeCacheAfter,
  invalidatePagesCache,
  invalidateSearchCache,
} = require("../utils/contentCache");

function upsertMainBanner(data) {
  return invalidateHomeCacheAfter(
    prisma.mainbanner.upsert({
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

function deleteMainBanner(id) {
  return invalidateAfter(
    prisma.mainbanner.deleteMany({
      where: {
        id,
      },
    }),
    invalidateHomeCache,
    invalidateContactUsCache,
    invalidatePagesCache,
    invalidateSearchCache
  );
}

module.exports = {
  deleteMainBanner,
  upsertMainBanner,
};
