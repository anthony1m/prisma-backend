const prisma = require("../utils/prisma");
const { cacheKey, rememberJson } = require("../utils/cache");
const { invalidateTeamMembersCacheAfter } = require("../utils/contentCache");

async function listTeamMembers({ page = 1, limit = 10, pageId } = {}) {
  return rememberJson(
    cacheKey("team-members", "list", page, limit, pageId),
    async () => {
      const skip = (page - 1) * limit;
      const where = pageId
        ? {
            pageId,
          }
        : undefined;

      const [items, total] = await prisma.$transaction([
        prisma.hometeammember.findMany({
          where,
          orderBy: {
            id: "asc",
          },
          skip,
          take: limit,
        }),
        prisma.hometeammember.count({
          where,
        }),
      ]);

      return {
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        items,
      };
    }
  );
}

function upsertTeamMember(data) {
  return invalidateTeamMembersCacheAfter(
    prisma.hometeammember.upsert({
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
  listTeamMembers,
  upsertTeamMember,
};
