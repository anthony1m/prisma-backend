const prisma = require("../utils/prisma");
const { invalidateAboutUsCacheAfter } = require("../utils/contentCache");

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

module.exports = {
  upsertSingaporeLeadership,
};
