const { Schema, model } = require("mongoose");

const sessionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    index: {
      expires: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Session = model("Session", sessionSchema);

module.exports = Session;
