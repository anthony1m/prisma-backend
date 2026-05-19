const prisma = require("../utils/prisma");

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

module.exports = {
  getAboutUsPage,
};
