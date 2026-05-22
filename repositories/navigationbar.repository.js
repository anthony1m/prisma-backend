const prisma = require("../utils/prisma");
const { rememberJson } = require("../utils/cache");
const { invalidateNavbarCacheAfter } = require("../utils/contentCache");

function getNavigationbar() {
  return rememberJson("navigationbar:main", () =>
    prisma.navigationbar.findUnique({
      where: {
        id: 1,
      },
    })
  );
}

function upsertNavigationbar(data) {
  return invalidateNavbarCacheAfter(
    prisma.navigationbar.upsert({
      where: {
        id: 1,
      },
      update: {
        button: data.button,
        imageURL: data.imageURL,
      },
      create: {
        id: 1,
        button: data.button,
        imageURL: data.imageURL,
      },
    })
  );
}

module.exports = {
  getNavigationbar,
  upsertNavigationbar,
};
