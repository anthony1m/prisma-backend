const prisma = require("../utils/prisma");
const { invalidateAboutUsCacheAfter } = require("../utils/contentCache");

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

module.exports = {
  upsertOurValue,
};
