const prisma = require("../utils/prisma");
const { rememberJson } = require("../utils/cache");
const {
  formatStrategicObjectivesSection,
} = require("./strategicObjectives.repository");

function getAboutUsPage() {
  return rememberJson("about-us:page", async () => {
    const page = await prisma.page.findUnique({
      where: {
        title: "About Us",
      },
      include: {
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
      },
    });

    if (!page) {
      return null;
    }

    return {
      ...page,
      strategicObjectives: formatStrategicObjectivesSection(
        page.strategicObjectives,
        page.id
      ),
    };
  });
}

module.exports = {
  getAboutUsPage,
};
