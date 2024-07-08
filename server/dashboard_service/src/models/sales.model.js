import mongoose from "mongoose";

const SalesOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    customer: {
      name: String,
      email: String,
      phone: String,
    },
    items: [
      {
        productId: String,
        quantity: Number,
        unitPrice: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "returned"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const SalesOrder = mongoose.model("SalesOrder", SalesOrderSchema);
