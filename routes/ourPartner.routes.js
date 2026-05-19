const router = require("express").Router();

const ourPartnerController = require("../controllers/ourPartner.controller");
const asyncRoute = require("../utils/asyncRoute");

router.get("/", asyncRoute(ourPartnerController.getOurPartnerPage));

module.exports = router;
