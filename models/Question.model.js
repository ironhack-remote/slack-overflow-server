const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
  question: String,
  tags: String,
  topic: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Question = model("Question", questionSchema);

module.exports = Question;
