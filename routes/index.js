const router = require("express").Router();
const questions = require("../questions.json");
const Session = require("../models/Session.model");
const Question = require("../models/Question.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  res.json("Hello world");
});

module.exports = router;
