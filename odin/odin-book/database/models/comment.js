import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model("Comment", CommentSchema);