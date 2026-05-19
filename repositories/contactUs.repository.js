const prisma = require("../utils/prisma");

function getContactUsPage() {
  return prisma.page.findUnique({
    where: {
      title: "Contact Us",
    },
    include: {
      mainBanner: true,
      contactUs: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });
}

function upsertContactUs(data) {
  return prisma.contactus.upsert({
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
  });
}

async function getContactUsNamedSection(title) {
  const page = await prisma.page.findUnique({
    where: {
      title: "Contact Us",
    },
  });

  if (!page) {
    return null;
  }

  return prisma.contactus.findUnique({
    where: {
      pageId_title: {
        pageId: page.id,
        title,
      },
    },
  });
}

async function upsertContactUsNamedSection(title, data) {
  const page = await prisma.page.upsert({
    where: {
      title: "Contact Us",
    },
    update: {},
    create: {
      title: "Contact Us",
    },
  });

  return prisma.contactus.upsert({
    where: {
      pageId_title: {
        pageId: page.id,
        title,
      },
    },
    update: {
      description: data.description,
      imageURL: data.imageURL,
    },
    create: {
      title,
      description: data.description,
      imageURL: data.imageURL,
      pageId: page.id,
    },
  });
}

function listContactUsSections(pageId) {
  return prisma.contactus.findMany({
    where: pageId
      ? {
          pageId,
        }
      : undefined,
    orderBy: {
      id: "asc",
    },
  });
}

module.exports = {
  getContactUsNamedSection,
  getContactUsPage,
  listContactUsSections,
  upsertContactUs,
  upsertContactUsNamedSection,
};
