const sectionService = require("../services/section.service");

async function getHomePage(req, res) {
  const homePage = await sectionService.getHomePage();

  res.json(homePage);
}

module.exports = {
  getHomePage,
};