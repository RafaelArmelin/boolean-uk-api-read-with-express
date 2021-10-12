const express = require("express");

const { createOne } = require("./controller");

const router = express.Router();

router.post("/", createOne);

// router.get("/:id", getOneById);

module.exports = router;
