const prisma = require("../utils/prisma");
const { rememberJson } = require("../utils/cache");
const { invalidateContactUsCache } = require("../utils/contentCache");

async function getContactUsMainBanner() {
  return rememberJson("contact-us:main-banner", async () => {
    const page = await prisma.page.findUnique({
      where: {
        title: "Contact Us",
      },
      include: {
        mainBanner: true,
      },
    });

    return page?.mainBanner ?? null;
  });
}

async function upsertContactUsMainBanner(data) {
  const page = await prisma.page.upsert({
    where: {
      title: "Contact Us",
    },
    update: {},
    create: {
      title: "Contact Us",
    },
  });

  const item = await prisma.mainbanner.upsert({
    where: {
      pageId: page.id,
    },
    update: {
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
    },
    create: {
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
      pageId: page.id,
    },
  });

  await invalidateContactUsCache();

  return item;
}

module.exports = {
  getContactUsMainBanner,
  upsertContactUsMainBanner,
};
