const prisma = require("../utils/prisma");
const { splitImageURLValues } = require("../utils/request");

const OUR_PARTNER_PAGE_TITLE = "Our Partner";
const SECTION_MAIN_BANNER = "main-banner";
const SECTION_BANK_PARTNERS = "bank-partners";
const SECTION_OTHER_PARTNERS = "other-partners";

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

function normalizeOurPartnerSection(section) {
  const normalizedSection = String(section || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");

  if (["main-banner", "banner", "our-partner-main-banner"].includes(normalizedSection)) {
    return SECTION_MAIN_BANNER;
  }

  if (
    [
      "bank",
      "banks",
      "bank-partner",
      "bank-partners",
      "section-one",
      "section-1",
      "one",
      "1",
      "our-partner-bank-partners",
      "our-partner-section-one",
    ].includes(normalizedSection)
  ) {
    return SECTION_BANK_PARTNERS;
  }

  if (
    [
      "other",
      "others",
      "other-partner",
      "other-partners",
      "section-two",
      "section-2",
      "two",
      "2",
      "our-partner-other-partners",
      "our-partner-section-two",
    ].includes(normalizedSection)
  ) {
    return SECTION_OTHER_PARTNERS;
  }

  throw createError(
    "section must be one of: main-banner, bank-partners, other-partners.",
    400
  );
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

async function getOurPartnerPageIdForRead() {
  const page = await prisma.page.findUnique({
    where: {
      title: OUR_PARTNER_PAGE_TITLE,
    },
    select: {
      id: true,
    },
  });

  if (!page) {
    throw createError("Our Partner page was not found.", 404);
  }

  return page.id;
}

async function getBankPartnersWithImages(where) {
  const section = await prisma.ourpartnerbankpartners.findUnique({
    where,
    include: {
      images: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });

  if (!section) {
    return null;
  }

  await getNormalizedExistingImageURLs(
    prisma.ourpartnerbankpartnerimage,
    section.id
  );

  return prisma.ourpartnerbankpartners.findUnique({
    where: {
      id: section.id,
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

async function getOtherPartnersWithImages(where) {
  const section = await prisma.ourpartnerotherpartners.findUnique({
    where,
    include: {
      images: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });

  if (!section) {
    return null;
  }

  await getNormalizedExistingImageURLs(
    prisma.ourpartnerotherpartnerimage,
    section.id
  );

  return prisma.ourpartnerotherpartners.findUnique({
    where: {
      id: section.id,
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

function wrapSearchResult(section, data) {
  return {
    section,
    data,
  };
}

async function getOurPartnerMainBanner(id) {
  const where = id !== undefined
    ? {
        id,
      }
    : {
        pageId: await getOurPartnerPageIdForRead(),
      };

  return prisma.ourpartnermainbanner.findUnique({
    where,
  });
}

async function getOurPartnerBankPartners(id) {
  const where = id !== undefined
    ? {
        id,
      }
    : {
        pageId: await getOurPartnerPageIdForRead(),
      };

  return getBankPartnersWithImages(where);
}

async function getOurPartnerOtherPartners(id) {
  const where = id !== undefined
    ? {
        id,
      }
    : {
        pageId: await getOurPartnerPageIdForRead(),
      };

  return getOtherPartnersWithImages(where);
}

async function getOurPartnerSection(section, id) {
  const normalizedSection = normalizeOurPartnerSection(section);
  let data;

  if (normalizedSection === SECTION_MAIN_BANNER) {
    data = await getOurPartnerMainBanner(id);
  }

  if (normalizedSection === SECTION_BANK_PARTNERS) {
    data = await getOurPartnerBankPartners(id);
  }

  if (normalizedSection === SECTION_OTHER_PARTNERS) {
    data = await getOurPartnerOtherPartners(id);
  }

  if (!data) {
    throw createError("Our Partner section was not found.", 404);
  }

  return wrapSearchResult(normalizedSection, data);
}

async function searchOurPartnerById(id) {
  const [mainBanner, bankPartners, otherPartners] = await Promise.all([
    getOurPartnerMainBanner(id),
    getOurPartnerBankPartners(id),
    getOurPartnerOtherPartners(id),
  ]);

  const results = [];

  if (mainBanner) {
    results.push(wrapSearchResult(SECTION_MAIN_BANNER, mainBanner));
  }

  if (bankPartners) {
    results.push(wrapSearchResult(SECTION_BANK_PARTNERS, bankPartners));
  }

  if (otherPartners) {
    results.push(wrapSearchResult(SECTION_OTHER_PARTNERS, otherPartners));
  }

  if (!results.length) {
    throw createError("No Our Partner data was found for this id.", 404);
  }

  return {
    id,
    results,
  };
}

async function searchOurPartner({ id, section }) {
  if (id === undefined && !section) {
    throw createError("Send id, section, or both to search Our Partner data.", 400);
  }

  if (section) {
    return getOurPartnerSection(section, id);
  }

  return searchOurPartnerById(id);
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
  getOurPartnerBankPartners,
  getOurPartnerMainBanner,
  getOurPartnerOtherPartners,
  getOurPartnerSection,
  searchOurPartner,
  upsertOurPartnerBankPartners,
  upsertOurPartnerMainBanner,
  upsertOurPartnerOtherPartners,
};
