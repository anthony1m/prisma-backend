const pageRepository = require("../repositories/page.repository");

function listPages() {
  return pageRepository.listPages();
}

function upsertPage(title) {
  return pageRepository.upsertPage(title);
}

module.exports = {
  listPages,
  upsertPage,
};
