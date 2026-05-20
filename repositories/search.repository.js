const prisma = require("../utils/prisma");

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeSection(section) {
  return String(section || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");
}

const pageInclude = {
  page: {
    select: {
      id: true,
      title: true,
    },
  },
};

const imageInclude = {
  images: {
    orderBy: {
      id: "asc",
    },
  },
  ...pageInclude,
};

const searchSources = [
  {
    section: "main-banner",
    modelName: "mainbanner",
    repository: prisma.mainbanner,
    aliases: ["main-banner", "main-banners", "banner", "home-main-banner"],
    include: pageInclude,
  },
  {
    section: "main-banner",
    modelName: "aboutusbanner",
    repository: prisma.aboutusbanner,
    aliases: ["main-banner", "about-us-banner", "aboutus-banner"],
    include: pageInclude,
  },
  {
    section: "main-banner",
    modelName: "ourpartnermainbanner",
    repository: prisma.ourpartnermainbanner,
    aliases: ["main-banner", "our-partner-main-banner"],
    include: pageInclude,
  },
  {
    section: "who-we-are",
    modelName: "whoweare",
    repository: prisma.whoweare,
    aliases: ["who-we-are", "whoweare"],
    include: pageInclude,
  },
  {
    section: "services",
    modelName: "ourservices",
    repository: prisma.ourservices,
    aliases: ["service", "services", "our-services"],
    include: pageInclude,
  },
  {
    section: "missions",
    modelName: "ourmission",
    repository: prisma.ourmission,
    aliases: ["mission", "missions", "our-mission"],
    include: pageInclude,
  },
  {
    section: "group-missions",
    modelName: "groupmission",
    repository: prisma.groupmission,
    aliases: ["group-mission", "group-missions"],
    include: pageInclude,
  },
  {
    section: "team-members",
    modelName: "hometeammember",
    repository: prisma.hometeammember,
    aliases: ["team-member", "team-members", "home-team-members"],
    include: pageInclude,
  },
  {
    section: "the-expansions",
    modelName: "theexpansion",
    repository: prisma.theexpansion,
    aliases: ["the-expansion", "the-expansions", "expansion", "expansions"],
    include: pageInclude,
  },
  {
    section: "our-values",
    modelName: "ourvalues",
    repository: prisma.ourvalues,
    aliases: ["our-value", "our-values", "values"],
    include: pageInclude,
  },
  {
    section: "group-history",
    modelName: "grouphistory",
    repository: prisma.grouphistory,
    aliases: ["group-history", "history"],
    include: pageInclude,
  },
  {
    section: "strategic-presence",
    modelName: "strategicpresence",
    repository: prisma.strategicpresence,
    aliases: ["strategic-presence", "presence"],
    include: pageInclude,
  },
  {
    section: "singapore-leadership",
    modelName: "singaporeleadership",
    repository: prisma.singaporeleadership,
    aliases: ["singapore-leadership", "leadership"],
    include: pageInclude,
  },
  {
    section: "strategic-objectives",
    modelName: "strategicobjectives",
    repository: prisma.strategicobjectives,
    aliases: ["strategic-objective", "strategic-objectives", "objectives"],
    include: pageInclude,
  },
  {
    section: "contact-us",
    modelName: "contactus",
    repository: prisma.contactus,
    aliases: ["contact-us", "contactus", "contact-section", "contact-sections"],
    include: pageInclude,
  },
  {
    section: "our-partner-bank-partners",
    modelName: "ourpartnerbankpartners",
    repository: prisma.ourpartnerbankpartners,
    aliases: [
      "bank",
      "banks",
      "bank-partner",
      "bank-partners",
      "our-partner-bank-partners",
      "section-one",
      "section-1",
      "one",
      "1",
    ],
    include: imageInclude,
  },
  {
    section: "our-partner-other-partners",
    modelName: "ourpartnerotherpartners",
    repository: prisma.ourpartnerotherpartners,
    aliases: [
      "other",
      "others",
      "other-partner",
      "other-partners",
      "our-partner-other-partners",
      "section-two",
      "section-2",
      "two",
      "2",
    ],
    include: imageInclude,
  },
  {
    section: "navigationbar",
    modelName: "navigationbar",
    repository: prisma.navigationbar,
    aliases: ["navigationbar", "navigation-bar", "navbar"],
  },
  {
    section: "home-footer",
    modelName: "homefooter",
    repository: prisma.homefooter,
    aliases: ["home-footer", "footer"],
  },
  {
    section: "pages",
    modelName: "Page",
    repository: prisma.page,
    aliases: ["page", "pages"],
  },
];

function getSources(section) {
  if (!section) {
    return searchSources;
  }

  const normalizedSection = normalizeSection(section);
  const sources = searchSources.filter((source) =>
    source.aliases.includes(normalizedSection)
  );

  if (!sources.length) {
    throw createError(`Unknown section: ${section}`, 400);
  }

  return sources;
}

async function searchSource(source, id) {
  const query = {
    orderBy: {
      id: "asc",
    },
  };

  if (id) {
    query.where = {
      id,
    };
  }

  if (source.include) {
    query.include = source.include;
  }

  const items = await source.repository.findMany(query);

  return items.map((item) => ({
    section: source.section,
    model: source.modelName,
    data: item,
  }));
}

async function searchContent({ id, section }) {
  if (!id && !section) {
    throw createError("Send id, section, or both.", 400);
  }

  const sources = getSources(section);
  const sourceResults = await Promise.all(
    sources.map((source) => searchSource(source, id))
  );
  const results = sourceResults.flat();

  return {
    filters: {
      id: id ?? null,
      section: section || null,
    },
    count: results.length,
    results,
  };
}

module.exports = {
  searchContent,
};
