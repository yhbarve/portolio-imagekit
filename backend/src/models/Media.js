const mongoose = require("mongoose");
const { Schema } = mongoose;

const mediaSchema = new Schema({
  fileName:  { type: String, required: true },
  fileType:  { type: String, enum: ["image","video"], required: true },
  url:       { type: String, required: true },
  owner:     { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  makePublic: { type: Boolean, default: false, required: false},
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = {Media};
