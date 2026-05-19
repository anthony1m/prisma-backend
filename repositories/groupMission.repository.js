const prisma = require("../utils/prisma");

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

module.exports = {
  upsertGroupMission,
};
