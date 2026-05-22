const prisma = require("../utils/prisma");
const { rememberJson } = require("../utils/cache");

function getAboutUsPage() {
  return rememberJson("about-us:page", () =>
    prisma.page.findUnique({
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
    })
  );
}

module.exports = {
  getAboutUsPage,
};
