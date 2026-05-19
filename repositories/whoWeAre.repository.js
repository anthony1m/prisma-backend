const prisma = require("../utils/prisma");

function upsertWhoWeAre(data) {
  return prisma.whoweare.upsert({
    where: {
      pageId: data.pageId,
    },
    update: {
      title: data.title,
      description: data.description,
      button: data.button,
      imageURL: data.imageURL,
    },
    create: data,
  });
}

module.exports = {
  upsertWhoWeAre,
};
