const router = require("express").Router();

const searchController = require("../controllers/search.controller");
const asyncRoute = require("../utils/asyncRoute");

router.get("/", asyncRoute(searchController.searchContent));

module.exports = router;
