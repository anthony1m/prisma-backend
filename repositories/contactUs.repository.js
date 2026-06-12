const prisma = require("../utils/prisma");
const { cacheKey, rememberJson } = require("../utils/cache");
const {
  invalidateAfter,
  invalidateContactUsCache,
  invalidateContactUsCacheAfter,
  invalidatePagesCache,
  invalidateSearchCache,
} = require("../utils/contentCache");

function getContactUsPage() {
  return rememberJson("contact-us:page", () =>
    prisma.page.findUnique({
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
    })
  );
}

function upsertContactUs(data) {
  const updateData = {
    description: data.description,
    phone: data.phone,
    address: data.address,
    email: data.email,
  };

  if (data.imageURL !== null && data.imageURL !== undefined) {
    updateData.imageURL = data.imageURL;
  }

  return invalidateContactUsCacheAfter(
    prisma.contactus.upsert({
      where: {
        pageId_title: {
          pageId: data.pageId,
          title: data.title,
        },
      },
      update: updateData,
      create: data,
    })
  );
}

async function getContactUsNamedSection(title) {
  return rememberJson(cacheKey("contact-us", "section", title), async () => {
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

  const updateData = {
    description: data.description,
    phone: data.phone,
    address: data.address,
    email: data.email,
  };

  if (data.imageURL !== null && data.imageURL !== undefined) {
    updateData.imageURL = data.imageURL;
  }

  const item = await prisma.contactus.upsert({
    where: {
      pageId_title: {
        pageId: page.id,
        title,
      },
    },
    update: updateData,
    create: {
      title,
      description: data.description,
      phone: data.phone,
      address: data.address,
      email: data.email,
      imageURL: data.imageURL,
      pageId: page.id,
    },
  });

  await invalidateContactUsCache();

  return item;
}

function deleteContactUs(id) {
  return invalidateAfter(
    prisma.contactus.deleteMany({
      where: {
        id,
      },
    }),
    invalidateContactUsCache,
    invalidatePagesCache,
    invalidateSearchCache
  );
}

function deleteContactUsNamedSection(title, id) {
  return invalidateAfter(
    prisma.contactus.deleteMany({
      where: {
        id,
        title,
      },
    }),
    invalidateContactUsCache,
    invalidatePagesCache,
    invalidateSearchCache
  );
}

function listContactUsSections(pageId) {
  return rememberJson(cacheKey("contact-us", "sections", pageId), () =>
    prisma.contactus.findMany({
      where: pageId
        ? {
            pageId,
          }
        : undefined,
      orderBy: {
        id: "asc",
      },
    })
  );
}

module.exports = {
  deleteContactUs,
  deleteContactUsNamedSection,
  getContactUsNamedSection,
  getContactUsPage,
  listContactUsSections,
  upsertContactUs,
  upsertContactUsNamedSection,
};
