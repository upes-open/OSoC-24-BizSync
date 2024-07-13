import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  title: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
});

export const Order = mongoose.model("Order", OrderSchema);
