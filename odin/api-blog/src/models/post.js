import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
});

// Export model
export default mongoose.model("Post", PostSchema);