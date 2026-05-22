const prisma = require("../utils/prisma");
const { invalidateHomeCacheAfter } = require("../utils/contentCache");

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

module.exports = {
  upsertOurService,
};
