const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, index: true, default: Date.now },
  message: Object,
  tags: { type: Array, index: true },
});

module.exports = mongoose.model("Logs", logSchema);
