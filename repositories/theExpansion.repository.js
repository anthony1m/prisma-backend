const prisma = require("../utils/prisma");
const { cacheKey, rememberJson } = require("../utils/cache");
const { invalidateExpansionsCacheAfter } = require("../utils/contentCache");

function listTheExpansions(pageId) {
  return rememberJson(cacheKey("the-expansions", "list", pageId), () =>
    prisma.theexpansion.findMany({
      where: pageId
        ? {
            pageId,
          }
        : undefined,
      orderBy: {
        id: "asc",
      },
    })
  );
}

function upsertTheExpansion(data) {
  return invalidateExpansionsCacheAfter(
    prisma.theexpansion.upsert({
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
    })
  );
}

module.exports = {
  listTheExpansions,
  upsertTheExpansion,
};
