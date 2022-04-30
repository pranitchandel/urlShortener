const mongoose = require("mongoose");

const schema = mongoose.Schema;

const URLSchema = schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Url = mongoose.model("Url", URLSchema);
