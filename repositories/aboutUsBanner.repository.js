const prisma = require("../utils/prisma");
const { rememberJson } = require("../utils/cache");
const { invalidateAboutUsCacheAfter } = require("../utils/contentCache");

function getAboutUsBanner() {
  return rememberJson("about-us:banner", () =>
    prisma.aboutusbanner.findFirst({
      include: {
        page: true,
      },
    })
  );
}

function upsertAboutUsBanner(data) {
  return invalidateAboutUsCacheAfter(
    prisma.aboutusbanner.upsert({
      where: {
        pageId: data.pageId,
      },
      update: {
        title: data.title,
        imageURL: data.imageURL,
      },
      create: data,
    })
  );
}

module.exports = {
  getAboutUsBanner,
  upsertAboutUsBanner,
};
