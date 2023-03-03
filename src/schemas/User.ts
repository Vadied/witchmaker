import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
      minlength: 5,
    },
    roles: { type: Array<string> },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
