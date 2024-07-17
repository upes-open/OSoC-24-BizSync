import mongoose, { Schema } from "mongoose";

const finSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
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

export const Fin = mongoose.model("fin", finSchema);
