import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    contactInfo: {
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        uniqe: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
    },
    status: {
      type: String,
      default: "active",
      trim: true,
      lowercase: true,
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

export const Supplier = mongoose.model("Supplier", SupplierSchema);
