import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
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
    position: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    roles: [
      {
        type: String,
        required: true,
        trim: true,
        lowecase: true,
      },
    ],
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

export const Staff = mongoose.model("Staff", StaffSchema);
