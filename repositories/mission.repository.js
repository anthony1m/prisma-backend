const prisma = require("../utils/prisma");
const { invalidateHomeCacheAfter } = require("../utils/contentCache");

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

module.exports = {
  upsertMission,
};
