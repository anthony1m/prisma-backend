const prisma = require("../utils/prisma");
const {
  invalidateAfter,
  invalidateHomeCache,
  invalidateHomeCacheAfter,
  invalidatePagesCache,
  invalidateSearchCache,
} = require("../utils/contentCache");

function upsertWhoWeAre(data) {
  return invalidateHomeCacheAfter(
    prisma.whoweare.upsert({
      where: {
        pageId: data.pageId,
      },
      update: {
        title: data.title,
        description: data.description,
        button: data.button,
        imageURL: data.imageURL,
      },
      create: data,
    })
  );
}

function deleteWhoWeAre(id) {
  return invalidateAfter(
    prisma.whoweare.deleteMany({
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
  deleteWhoWeAre,
  upsertWhoWeAre,
};
