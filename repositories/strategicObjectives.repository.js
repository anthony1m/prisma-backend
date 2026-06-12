const prisma = require("../utils/prisma");
const { cacheKey, rememberJson } = require("../utils/cache");
const {
  invalidateAboutUsCache,
  invalidatePagesCache,
  invalidateSearchCache,
  invalidateStrategicObjectivesCache,
} = require("../utils/contentCache");
const { createError } = require("../utils/http");

const STRATEGIC_OBJECTIVES_TITLE = "Strategic Objectives";

function formatStrategicObjectivesSection(items, pageId = null) {
  if (!items?.length) {
    return {
      title: STRATEGIC_OBJECTIVES_TITLE,
      pageId,
      items: [],
    };
  }

  const [firstItem] = items;

  return {
    title: STRATEGIC_OBJECTIVES_TITLE,
    pageId: firstItem.pageId,
    items: items.map((item) => ({
      id: item.id,
      description: item.description,
      imageURL: item.imageURL,
      pageId: item.pageId,
    })),
  };
}

function invalidateStrategicObjectiveReads() {
  return Promise.all([
    invalidateStrategicObjectivesCache(),
    invalidateAboutUsCache(),
    invalidatePagesCache(),
    invalidateSearchCache(),
  ]);
}

function listStrategicObjectives(pageId) {
  return rememberJson(cacheKey("strategic-objectives", "list", pageId), async () => {
    const items = await prisma.strategicobjectives.findMany({
      where: pageId
        ? {
            pageId,
          }
        : undefined,
      orderBy: {
        id: "asc",
      },
    });

    return formatStrategicObjectivesSection(items, pageId ?? null);
  });
}

async function upsertStrategicObjective(data) {
  if (data.id) {
    const result = await prisma.strategicobjectives.updateMany({
      where: {
        id: data.id,
        pageId: data.pageId,
      },
      data: {
        title: STRATEGIC_OBJECTIVES_TITLE,
        description: data.description,
        imageURL: data.imageURL,
      },
    });

    if (!result.count) {
      throw createError("Strategic objective was not found.", 404);
    }
  } else {
    await prisma.strategicobjectives.create({
      data: {
        title: STRATEGIC_OBJECTIVES_TITLE,
        description: data.description,
        imageURL: data.imageURL,
        pageId: data.pageId,
      },
    });
  }

  await invalidateStrategicObjectiveReads();

  return listStrategicObjectives(data.pageId);
}

async function deleteStrategicObjective(id) {
  const result = await prisma.strategicobjectives.deleteMany({
    where: {
      id,
    },
  });

  await invalidateStrategicObjectiveReads();

  return result;
}

module.exports = {
  deleteStrategicObjective,
  formatStrategicObjectivesSection,
  listStrategicObjectives,
  STRATEGIC_OBJECTIVES_TITLE,
  upsertStrategicObjective,
};
