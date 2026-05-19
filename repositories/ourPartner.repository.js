const prisma = require("../utils/prisma");
const { splitImageURLValues } = require("../utils/request");

const OUR_PARTNER_PAGE_TITLE = "Our Partner";

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function getOurPartnerPageById(pageId) {
  const page = await prisma.page.findUnique({
    where: {
      id: pageId,
    },
  });

  if (!page) {
    throw createError("Our Partner page was not found for this pageId.", 404);
  }

  if (page.title !== OUR_PARTNER_PAGE_TITLE) {
    throw createError("pageId must belong to the Our Partner page.", 400);
  }

  return page;
}

function getOrCreateOurPartnerPageByTitle() {
  return prisma.page.upsert({
    where: {
      title: OUR_PARTNER_PAGE_TITLE,
    },
    update: {},
    create: {
      title: OUR_PARTNER_PAGE_TITLE,
    },
  });
}

function getOurPartnerPageRecord(pageId) {
  if (pageId) {
    return getOurPartnerPageById(pageId);
  }

  return getOrCreateOurPartnerPageByTitle();
}

async function getOurPartnerPage() {
  const page = await prisma.page.findUnique({
    where: {
      title: OUR_PARTNER_PAGE_TITLE,
    },
    include: {
      ourPartnerMainBanner: true,
      ourPartnerBankPartners: true,
      ourPartnerOtherPartners: true,
    },
  });

  if (!page) {
    return null;
  }

  if (page.ourPartnerBankPartners) {
    await getNormalizedExistingImageURLs(
      prisma.ourpartnerbankpartnerimage,
      page.ourPartnerBankPartners.id
    );
  }

  if (page.ourPartnerOtherPartners) {
    await getNormalizedExistingImageURLs(
      prisma.ourpartnerotherpartnerimage,
      page.ourPartnerOtherPartners.id
    );
  }

  return prisma.page.findUnique({
    where: {
      id: page.id,
    },
    include: {
      ourPartnerMainBanner: true,
      ourPartnerBankPartners: {
        include: {
          images: {
            orderBy: {
              id: "asc",
            },
          },
        },
      },
      ourPartnerOtherPartners: {
        include: {
          images: {
            orderBy: {
              id: "asc",
            },
          },
        },
      },
    },
  });
}

function uniqueImageURLs(imageURLs) {
  return [...new Set(imageURLs)];
}

async function getNormalizedExistingImageURLs(imageRepository, sectionId) {
  const existingImages = await imageRepository.findMany({
    where: {
      sectionId,
    },
    select: {
      imageURL: true,
    },
  });
  const normalizedImageURLs = uniqueImageURLs(
    existingImages.flatMap((image) => splitImageURLValues(image.imageURL))
  );
  const needsRepair =
    normalizedImageURLs.length !== existingImages.length ||
    existingImages.some((image) => splitImageURLValues(image.imageURL).length > 1);

  if (needsRepair) {
    await imageRepository.deleteMany({
      where: {
        sectionId,
      },
    });

    if (normalizedImageURLs.length) {
      await imageRepository.createMany({
        data: normalizedImageURLs.map((imageURL) => ({
          imageURL,
          sectionId,
        })),
      });
    }
  }

  return new Set(normalizedImageURLs);
}

async function createMissingPartnerImages(imageRepository, sectionId, imageURLs) {
  const existingImageURLs = await getNormalizedExistingImageURLs(
    imageRepository,
    sectionId
  );
  const newImageURLs = uniqueImageURLs(imageURLs).filter(
    (imageURL) => !existingImageURLs.has(imageURL)
  );

  if (!newImageURLs.length) {
    return;
  }

  await imageRepository.createMany({
    data: newImageURLs.map((imageURL) => ({
      imageURL,
      sectionId,
    })),
  });
}

async function upsertOurPartnerMainBanner(data) {
  const page = await getOurPartnerPageRecord(data.pageId);

  return prisma.ourpartnermainbanner.upsert({
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

async function upsertOurPartnerBankPartners(data) {
  const page = await getOurPartnerPageRecord(data.pageId);

  const section = await prisma.ourpartnerbankpartners.upsert({
    where: {
      pageId: page.id,
    },
    update: {
      title: data.title,
    },
    create: {
      title: data.title,
      pageId: page.id,
    },
  });

  await createMissingPartnerImages(
    prisma.ourpartnerbankpartnerimage,
    section.id,
    data.imageURLs
  );

  return prisma.ourpartnerbankpartners.findUnique({
    where: {
      pageId: page.id,
    },
    include: {
      images: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });
}

async function upsertOurPartnerOtherPartners(data) {
  const page = await getOurPartnerPageRecord(data.pageId);

  const section = await prisma.ourpartnerotherpartners.upsert({
    where: {
      pageId: page.id,
    },
    update: {
      title: data.title,
    },
    create: {
      title: data.title,
      pageId: page.id,
    },
  });

  await createMissingPartnerImages(
    prisma.ourpartnerotherpartnerimage,
    section.id,
    data.imageURLs
  );

  return prisma.ourpartnerotherpartners.findUnique({
    where: {
      pageId: page.id,
    },
    include: {
      images: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });
}

module.exports = {
  getOurPartnerPage,
  upsertOurPartnerBankPartners,
  upsertOurPartnerMainBanner,
  upsertOurPartnerOtherPartners,
};
