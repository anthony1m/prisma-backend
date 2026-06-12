const prisma = require("../utils/prisma");
const {
  invalidateAboutUsCache,
  invalidateAboutUsCacheAfter,
  invalidateAfter,
  invalidatePagesCache,
  invalidateSearchCache,
} = require("../utils/contentCache");

function upsertOurValue(data) {
  return invalidateAboutUsCacheAfter(
    prisma.ourvalues.upsert({
      where: {
        pageId_title: {
          pageId: data.pageId,
          title: data.title,
        },
      },
      update: {
        description: data.description,
      },
      create: data,
    })
  );
}

function deleteOurValue(id) {
  return invalidateAfter(
    prisma.ourvalues.deleteMany({
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
  deleteOurValue,
  upsertOurValue,
};
