const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  color: { type: String, default: "#3867d6" },
  textcolor: { type: String, default: "#fff" },
});

module.exports = mongoose.model("Event", eventSchema);
