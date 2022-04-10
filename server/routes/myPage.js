const express = require("express");
const router = express.Router();
const controllers = require("../controllers/myPage");

router.get("/", controllers.get);

module.exports = router;
