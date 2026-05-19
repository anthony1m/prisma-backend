const prisma = require("../utils/prisma");

function upsertMainBanner(data) {
  return prisma.mainbanner.upsert({
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
  upsertMainBanner,
};
