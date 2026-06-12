const prisma = require("../utils/prisma");
const {
  invalidateAboutUsCache,
  invalidateAboutUsCacheAfter,
  invalidateAfter,
  invalidatePagesCache,
  invalidateSearchCache,
} = require("../utils/contentCache");

function upsertSingaporeLeadership(data) {
  return invalidateAboutUsCacheAfter(
    prisma.singaporeleadership.upsert({
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

function deleteSingaporeLeadership(id) {
  return invalidateAfter(
    prisma.singaporeleadership.deleteMany({
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
  deleteSingaporeLeadership,
  upsertSingaporeLeadership,
};
