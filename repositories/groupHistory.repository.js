const prisma = require("../utils/prisma");
const { invalidateAboutUsCacheAfter } = require("../utils/contentCache");

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

module.exports = {
  upsertGroupHistory,
};
