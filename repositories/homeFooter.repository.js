const prisma = require("../utils/prisma");
const { rememberJson } = require("../utils/cache");
const { invalidateFooterCacheAfter } = require("../utils/contentCache");

function getHomeFooter() {
  return rememberJson("home-footer:main", () =>
    prisma.homefooter.findUnique({
      where: {
        id: 1,
      },
    })
  );
}

function upsertHomeFooter(data) {
  return invalidateFooterCacheAfter(
    prisma.homefooter.upsert({
      where: {
        id: 1,
      },
      update: {
        title: data.title,
        description: data.description,
        imageURL: data.imageURL,
      },
      create: {
        id: 1,
        title: data.title,
        description: data.description,
        imageURL: data.imageURL,
      },
    })
  );
}

module.exports = {
  getHomeFooter,
  upsertHomeFooter,
};
