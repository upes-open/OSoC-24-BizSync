import { Supplier } from "../models/supplier.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getSuppliers = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const suppliers = await Supplier.find({ user: userId });
  return res
    .status(200)
    .json(new ApiResponse(200, { suppliers }, "Fetched Successfully"));
});

const addSupplier = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, contactInfo } = req.body;

  if (!contactInfo.email || !contactInfo.phone || !name)
    throw new ApiError(400, "All fields are required");

  const existingSupplier = await Supplier.findOne({
    contactInfo: { email: contactInfo.email },
  });

  if (existingSupplier) throw new ApiError(400, "Duplicate Supllier");

  const supplier = await Supplier.create({
    name,
    contactInfo,
    user: userId,
  });

  const savedSupplier = await Supplier.findOne({ _id: supplier._id });
  if (!savedSupplier)
    throw new ApiError(500, "Something went wrong saving user");

  return res
    .status(200)
    .json(
      new ApiResponse(200, { savedSupplier }, "Supplier created successfully")
    );
});

const updateSupplier = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const supplierId = req.params.id;
  const { name, contactInfo, status } = req.body;

  const supplier = await Supplier.findOne({ _id: supplierId, user: userId });

  if (!supplier) {
    return res.status(404).json({
      error: "Supplier not found or not authorized to update this supplier",
    });
  }

  supplier.name = name !== undefined ? name : supplier.name;
  supplier.contactInfo =
    contactInfo !== undefined ? contactInfo : supplier.contactInfo;
  supplier.status = status !== undefined ? status : supplier.status;

  await supplier.save();

  const savedSupplier = await Supplier.findOne({ _id: supplier._id });

  return res
    .status(200)
    .json(new ApiResponse(200, { savedSupplier }, "Update Success"));
});

export { getSuppliers, updateSupplier, addSupplier };
