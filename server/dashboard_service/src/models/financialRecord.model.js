import mongoose from "mongoose";

const FinancialRecordSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
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
    trim: true,
    lowercase: true,
  },
  status: {
    type: String,
    default: "active",
    trim: true,
    lowercase: true,
  },
});

export const FinancialRecord = mongoose.model(
  "FinancialRecord",
  FinancialRecordSchema
);
