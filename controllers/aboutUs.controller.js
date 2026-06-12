const sectionService = require("../services/section.service");

async function getAboutUsPage(req, res) {
  const aboutUsPage = await sectionService.getAboutUsPage();

  res.json(aboutUsPage);
}

module.exports = {
  getAboutUsPage,
};
