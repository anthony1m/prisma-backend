const prisma = require("../utils/prisma");

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
  upsertTeamMember,
};
