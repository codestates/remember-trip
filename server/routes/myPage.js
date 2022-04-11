const express = require("express");
const router = express.Router();
const controllers = require("../controllers/myPage");

router.get("/", controllers.get);

router.patch("/", controllers.patch);

router.post("/trip", controllers.post);

module.exports = router;
