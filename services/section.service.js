const prisma = require("../utils/prisma");

function getHomePage() {
  return prisma.page.findUnique({
    where: {
      title: "Home",
    },
    include: {
      mainBanner: true,
      homeTeamMembers: true,
      whoWeAre: true,
      services: true,
      mission: true,
      groupMission: true,
    },
  });
}

function getAboutUsPage() {
  return prisma.page.findUnique({
    where: {
      title: "About Us",
    },
    include: {
      aboutUsBanner: true,
      theExpansion: true,
      ourValues: true,
      groupHistory: true,
      strategicPresence: true,
      singaporeLeadership: true,
      strategicObjectives: true,
    },
  });
}

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

function upsertMainBanner(data) {
  return prisma.mainbanner.upsert({
    where: {
      pageId: data.pageId,
    },
    update: {
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
    },
    create: data,
  });
}

function upsertWhoWeAre(data) {
  return prisma.whoweare.upsert({
    where: {
      pageId: data.pageId,
    },
    update: {
      title: data.title,
      description: data.description,
      button: data.button,
      imageURL: data.imageURL,
    },
    create: data,
  });
}

function upsertOurService(data) {
  return prisma.ourservices.upsert({
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

function upsertMission(data) {
  return prisma.ourmission.upsert({
    where: {
      pageId: data.pageId,
    },
    update: {
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
    },
    create: data,
  });
}

function upsertNavigationbar(data) {
  return prisma.navigationbar.upsert({
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
  });
}

function getNavigationbar() {
  return prisma.navigationbar.findUnique({
    where: {
      id: 1,
    },
  });
}

function upsertGroupMission(data) {
  return prisma.groupmission.upsert({
    where: {
      pageId: data.pageId,
    },
    update: {
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
    },
    create: data,
  });
}

function upsertAboutUsBanner(data) {
  return prisma.aboutusbanner.upsert({
    where: {
      pageId: data.pageId,
    },
    update: {
      title: data.title,
      imageURL: data.imageURL,
    },
    create: data,
  });
}

function getAboutUsBanner() {
  return prisma.aboutusbanner.findFirst({
    include: {
      page: true,
    },
  });
}

function upsertTheExpansion(data) {
  return prisma.theexpansion.upsert({
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

function listTheExpansions(pageId) {
  return prisma.theexpansion.findMany({
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

function upsertOurValue(data) {
  return prisma.ourvalues.upsert({
    where: {
      pageId_title: {
        pageId: data.pageId,
        title: data.title,
      },
    },
    update: {
      description: data.description,
    },
    create: data,
  });
}

function upsertGroupHistory(data) {
  return prisma.grouphistory.upsert({
    where: {
      pageId: data.pageId,
    },
    update: {
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
    },
    create: data,
  });
}

function upsertStrategicPresence(data) {
  return prisma.strategicpresence.upsert({
    where: {
      pageId: data.pageId,
    },
    update: {
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
    },
    create: data,
  });
}

function upsertSingaporeLeadership(data) {
  return prisma.singaporeleadership.upsert({
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

function upsertStrategicObjective(data) {
  return prisma.strategicobjectives.upsert({
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

function upsertHomeFooter(data) {
  return prisma.homefooter.upsert({
    where: {
      id: 1,
    },
    update: {
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
    },
    create: {
      id: 1,
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
    },
  });
}

function getHomeFooter() {
  return prisma.homefooter.findUnique({
    where: {
      id: 1,
    },
  });
}

function upsertTeamMember(data) {
  return prisma.hometeammember.upsert({
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

module.exports = {
  getAboutUsBanner,
  getContactUsMainBanner,
  getContactUsNamedSection,
  getContactUsPage,
  getHomeFooter,
  getHomePage,
  getNavigationbar,
  listContactUsSections,
  listTheExpansions,
  upsertAboutUsBanner,
  upsertContactUsMainBanner,
  upsertContactUsNamedSection,
  upsertContactUs,
  upsertGroupMission,
  upsertGroupHistory,
  upsertHomeFooter,
  upsertMainBanner,
  upsertMission,
  upsertNavigationbar,
  upsertOurService,
  upsertOurValue,
  upsertSingaporeLeadership,
  upsertStrategicObjective,
  upsertStrategicPresence,
  upsertTeamMember,
  upsertTheExpansion,
  upsertWhoWeAre,
};
