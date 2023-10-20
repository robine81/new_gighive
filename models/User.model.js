const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      unique: false,
    },
    surname: {
      type: String,
      required: false,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: false,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
