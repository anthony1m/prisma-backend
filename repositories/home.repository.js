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

module.exports = {
  getHomePage,
};
