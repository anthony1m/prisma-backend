const prisma = require("../utils/prisma");

async function getContactUsMainBanner() {
  const page = await prisma.page.findUnique({
    where: {
      title: "Contact Us",
    },
    include: {
      mainBanner: true,
    },
  });

  return page?.mainBanner ?? null;
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

  return prisma.mainbanner.upsert({
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
}

module.exports = {
  getContactUsMainBanner,
  upsertContactUsMainBanner,
};
