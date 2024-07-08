import mongoose from "mongoose";

const InventoryItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      uniqe: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    reorderLevel: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      trim: true,
      lowercase: true,
      default: "active",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const InventoryItem = mongoose.model(
  "InventoryItem",
  InventoryItemSchema
);
