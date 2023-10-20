const { Schema, model } = require("mongoose");

const festivalSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  venue: {
    type: String,
    required: true,
  },
  textInfo:String,
  genre: {
    type: String,
    enum: ["House", "Techno", "Trance"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  imageUrl: {
    type: String,
  },
  socialMedia: {
    type: String,
  },
  createdBy:
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
});

const FestivalModel = model("festival", festivalSchema);
module.exports = FestivalModel;