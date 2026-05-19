const pageService = require("../services/page.service");
const { text } = require("../utils/request");

async function listPages(req, res) {
  const pages = await pageService.listPages();
  res.json(pages);
}

async function upsertPage(req, res) {
  const title = text(req, "title");
  const page = await pageService.upsertPage(title);

  res.status(201).json(page);
}

module.exports = {
  listPages,
  upsertPage,
};
