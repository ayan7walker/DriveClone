const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  cloudinaryId: String,      // public_id (delete ke liye zaroori)
  url: String,               // secure_url (view ke liye)
  resourceType: String,      // image / video / raw
  size: Number,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);