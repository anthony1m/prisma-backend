const prisma = require("../utils/prisma");
const { invalidateHomeCacheAfter } = require("../utils/contentCache");

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

module.exports = {
  upsertGroupMission,
};
