import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

export default mongoose.model("User", UserSchema);