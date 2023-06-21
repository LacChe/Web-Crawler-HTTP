const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 100 },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true },
});

// Virtual for item's URL
ItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/items/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);