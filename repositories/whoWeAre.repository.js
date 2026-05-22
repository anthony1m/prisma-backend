const prisma = require("../utils/prisma");
const { invalidateHomeCacheAfter } = require("../utils/contentCache");

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

module.exports = {
  upsertWhoWeAre,
};
