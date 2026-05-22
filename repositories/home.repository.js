const prisma = require("../utils/prisma");
const { rememberJson } = require("../utils/cache");

function getHomePage() {
  return rememberJson("home:page", () =>
    prisma.page.findUnique({
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
    })
  );
}

module.exports = {
  getHomePage,
};
