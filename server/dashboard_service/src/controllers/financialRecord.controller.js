import { FinancialRecord } from "../models/financialRecord.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getFinancialRecords = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const financialRecords = await FinancialRecord.find({ user: userId });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { records: financialRecords },
        "Fetched successfully"
      )
    );
});

const addFinancialRecords = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { type, amount, date, category } = req.body;

  if (!type || !amount || !date || !category)
    throw new ApiError(400, "Invalid fields");

  const existingRecord = await FinancialRecord.findOne({
    user: userId,
    type,
    amount,
    date,
    category,
  });

  if (existingRecord) throw new ApiError(400, "Duplicate Record");

  const record = await FinancialRecord.create({
    type,
    amount,
    date,
    category,
    user: userId,
  });

  const savedRecord = await FinancialRecord.findOne({ _id: record._id });

  if (!savedRecord) throw new ApiError(500, "Something went wrong");

  return res
    .status(200)
    .json(new ApiResponse(200, { savedRecord }, "Created successfullly"));
});

const updateFinancialRecord = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const recordId = req.params.id;

  const { type, amount, date, category, status } = req.body;

  const record = await FinancialRecord.findOne({
    _id: recordId,
    user: userId,
  });

  if (!record) throw new ApiError(404, "Not Found");

  record.type = type !== undefined ? type : record.type;
  record.amount = amount !== undefined ? amount : record.amount;
  record.date = date !== undefined ? date : record.date;
  record.category = category !== undefined ? category : record.category;
  record.status = status !== undefined ? status : record.status;

  await record.save();

  const updatedRecord = await FinancialRecord.findOne({ _id: record._id });
  if (!updatedRecord) throw new ApiError(404, "Not found");

  return res
    .status(200)
    .json(new ApiResponse(200, { updatedRecord }, "Success"));
});

const getReport = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { type, startDate, endDate, category, status } = req.query;

  const query = {};

  query.user = userId;

  if (type) {
    query.type = type;
  }

  if (startDate || endDate) {
    query.date = {};
    if (startDate) {
      query.date.$gte = new Date(startDate);
    }
    if (endDate) {
      query.date.$lte = new Date(endDate);
    }
  }

  if (category) {
    query.category = category;
  }

  if (status) {
    query.status = status;
  }

  const reports = await FinancialRecord.find(query);

  return res.status(200).json(new ApiResponse(200, { reports }, "Success"));
});

export {
  getFinancialRecords,
  addFinancialRecords,
  updateFinancialRecord,
  getReport,
};
