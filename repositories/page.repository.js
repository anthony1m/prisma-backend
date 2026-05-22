const prisma = require("../utils/prisma");
const { rememberJson } = require("../utils/cache");
const { invalidatePagesCacheAfter } = require("../utils/contentCache");

const pageInclude = {
  mainBanner: true,
  homeTeamMembers: {
    orderBy: {
      id: "asc",
    },
  },
  whoWeAre: true,
  services: {
    orderBy: {
      id: "asc",
    },
  },
  mission: true,
  groupMission: true,
  aboutUsBanner: true,
  theExpansion: {
    orderBy: {
      id: "asc",
    },
  },
  ourValues: {
    orderBy: {
      id: "asc",
    },
  },
  groupHistory: true,
  strategicPresence: true,
  singaporeLeadership: {
    orderBy: {
      id: "asc",
    },
  },
  strategicObjectives: {
    orderBy: {
      id: "asc",
    },
  },
  contactUs: {
    orderBy: {
      id: "asc",
    },
  },
};

function listPages() {
  return rememberJson("pages:all", () =>
    prisma.page.findMany({
      include: pageInclude,
      orderBy: {
        id: "asc",
      },
    })
  );
}

function upsertPage(title) {
  return invalidatePagesCacheAfter(
    prisma.page.upsert({
      where: {
        title,
      },
      update: {
        title,
      },
      create: {
        title,
      },
    })
  );
}

module.exports = {
  listPages,
  upsertPage,
};
