const searchRepository = require("../repositories/search.repository");

function searchContent(filters) {
  return searchRepository.searchContent(filters);
}

module.exports = {
  searchContent,
};
