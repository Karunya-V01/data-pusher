const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const accountSchema = new mongoose.Schema({
  account_name: { type: String, required: true },
  website: String,
  app_secret_token: { type: String, default: () => uuidv4() },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Account", accountSchema);
