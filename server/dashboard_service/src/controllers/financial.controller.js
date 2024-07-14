import { apiError } from "../utils/ApiError.js";
import { apiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Fin } from "../models/financial.model.js";

const finRecord = asyncHandler(async (req, res) => {
  const records = await Fin.find();
  res
    .status(200)
    .json(
      new apiResponse(200, "Financial records retrieved successfully", records)
    );
});

const addFinRecord = asyncHandler(async (req, res) => {
  const { type, amount, date, category, status } = req.body;

  if (!type || !amount || !date || !category || !status) {
    throw new apiError(400, "All fields are required");
  }

  const newRecord = new Fin({ type, amount, date, category, status });
  const createdRecord = await newRecord.save();

  res
    .status(201)
    .json(
      new apiResponse(201, "Financial record added successfully", createdRecord)
    );
});

const updateFinRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { type, amount, date, category, status } = req.body;

  const record = await Fin.findById(id);

  if (!record) {
    throw new apiError(404, "Financial record not found");
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
      new apiResponse(
        200,
        "Financial record updated successfully",
        updatedRecord
      )
    );
});

const finReport = asyncHandler(async (req, res) => {
  const { date } = req.query;
  //for demo purpose only
  if (!date) {
    throw new apiError(400, "Date query parameter is required");
  }
  const records = await Fin.find({ date: new Date(date) });
  res
    .status(200)
    .json(new apiResponse(200, "Reports generated successfully", records));
});

export { finRecord, addFinRecord, updateFinRecord, finReport };
