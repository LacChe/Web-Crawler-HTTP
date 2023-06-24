import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  date: { type: Date, required: true },
});

PostSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

export default mongoose.model("Post", PostSchema);