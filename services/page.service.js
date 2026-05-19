const prisma = require("../utils/prisma");

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
  return prisma.page.findMany({
    include: pageInclude,
    orderBy: {
      id: "asc",
    },
  });
}

function upsertPage(title) {
  return prisma.page.upsert({
    where: {
      title,
    },
    update: {
      title,
    },
    create: {
      title,
    },
  });
}

module.exports = {
  listPages,
  upsertPage,
};
