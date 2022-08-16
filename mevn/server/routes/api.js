const express = require("express")
const router = express.Router()
const apictrl = require("../controllers/api");

router.get("/", apictrl.getUser);

module.exports = router;

