import mongoose, { Schema } from "mongoose";

const inventorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    reorderLevel: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

inventorySchema.methods.invalidQuantity = async function (quantity, next) {
  if (quantity < 0) {
    return next(new apiError("Quantity less than 0 not allowed"));
  }
  next();
};

export const Inventory = mongoose.model("Inventory", inventorySchema);
