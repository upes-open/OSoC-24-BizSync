import mongoose, { Schema } from "mongoose";

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    contactInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      sate: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Supplier = mongoose.model("supplier", supplierSchema);
