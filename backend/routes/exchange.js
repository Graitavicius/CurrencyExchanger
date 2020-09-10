const express = require("express");

const ExchangeController = require("../controllers/exchange");

const router = express.Router();

router.get("", ExchangeController.getPosts);

module.exports = router;
