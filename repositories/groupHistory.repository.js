const prisma = require("../utils/prisma");
const {
  invalidateAboutUsCache,
  invalidateAboutUsCacheAfter,
  invalidateAfter,
  invalidatePagesCache,
  invalidateSearchCache,
} = require("../utils/contentCache");

function upsertGroupHistory(data) {
  return invalidateAboutUsCacheAfter(
    prisma.grouphistory.upsert({
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

function deleteGroupHistory(id) {
  return invalidateAfter(
    prisma.grouphistory.deleteMany({
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
  deleteGroupHistory,
  upsertGroupHistory,
};
