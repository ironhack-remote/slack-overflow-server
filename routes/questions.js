const isLoggedIn = require("../middlewares/isLoggedIn");
const Question = require("../models/Question.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  Question.find()
    .populate("author")
    .then((allQuestions) => {
      res.json(allQuestions);
    });
  // Questions.find({}).then(allQuestions=>{

  //   res.json(allQuestions);
  // })
});

// router.post("/new-question", (req, res) => {
//   // missing some user validation
//   const { question, topic, tags } = req.body;

//   if (!req.headers.authorization || req.headers.authorization === "null") {
//     console.log("THERE WAS AN ERROR, / NOT AUTHENTICATED");
//     return res.status(400).json({ errorMessage: "You are not authenticated" });
//   }
//   // if it reaches here, the user clearly sent an accessToken.
//   Session.findById(req.headers.authorization)
//     .populate("user")
//     .then((sessionInfo) => {
//       if (!sessionInfo) {
//         return res
//           .status(400)
//           .json({ errorMessage: "You are not authenticated" });
//       }

//       // USER IS AUTHENTICATED
//       Question.create({
//         question,
//         topic,
//         tags,
//         author: sessionInfo.user._id,
//       }).then((newQuestion) => {
//         res.json(newQuestion);
//       });
//     });
// });
router.post("/new", isLoggedIn, (req, res) => {
  // missing some user validation
  const { question, topic, tags } = req.body;

  // USER IS AUTHENTICATED
  Question.create({
    question,
    topic,
    tags,
    author: req.user._id,
  }).then((newQuestion) => {
    res.json(newQuestion);
  });
});

router.get("/:id", (req, res) => {
  Question.findById(req.params.id).then((singleQuestion) => {
    res.json(singleQuestion);
  });
});

router.put("/:id", isLoggedIn, (req, res) => {
  Question.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (questionUpdated) => {
      res.json({ message: "all good", questionUpdated });
    }
  );
});

module.exports = router;
