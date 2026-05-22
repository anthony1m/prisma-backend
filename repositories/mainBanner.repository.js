const prisma = require("../utils/prisma");
const { invalidateHomeCacheAfter } = require("../utils/contentCache");

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

module.exports = {
  upsertMainBanner,
};
