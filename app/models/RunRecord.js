const mongoose = require("mongoose");

const runRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  runDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("RunRecord", runRecordSchema);
