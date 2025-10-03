const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  account_id: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  url: { type: String, required: true },
  http_method: { type: String, required: true },
  headers: { type: Object, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Destination", destinationSchema);
