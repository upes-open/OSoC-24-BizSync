import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Fin } from "../models/financial.model.js";

const finRecord = asyncHandler(async (req, res) => {
  const records = await Fin.find();
  res
    .status(200)
    .json(
      new ApiResponse(200, records, "Financial records retrieved successfully")
    );
});

const addFinRecord = asyncHandler(async (req, res) => {
  const { type, amount, date, category, status } = req.body;

  if (!type || !amount || !date || !category || !status) {
    throw new ApiError(400, "All fields are required");
  }

  const newRecord = new Fin({ type, amount, date, category, status });
  const createdRecord = await newRecord.save();

  res
    .status(201)
    .json(
      new ApiResponse(201, createdRecord, "Financial record added successfully")
    );
});

const updateFinRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { type, amount, date, category, status } = req.body;

  const record = await Fin.findById(id);

  if (!record) {
    throw new ApiError(404, "Financial record not found");
  }
  record.type = type || record.type;
  record.amount = amount || record.amount;
  record.date = date || record.date;
  record.category = category || record.category;
  record.status = status || record.status;

  const updatedRecord = await record.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Financial record updated successfully",
        updatedRecord
      )
    );
});

const finReport = asyncHandler(async (req, res) => {
  const date = req.query.date;
  //for demo purpose only
  if (!date) {
    throw new ApiError(400, "Date query parameter is required");
  }
  const records = await Fin.find({ date: new Date(date) });
  res
    .status(200)
    .json(new ApiResponse(200, records, "Reports generated successfully"));
});

export { finRecord, addFinRecord, updateFinRecord, finReport };
