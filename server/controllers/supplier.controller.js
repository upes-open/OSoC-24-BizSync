import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Supplier } from "../models/supplier.model.js";

const supplierList = asyncHandler(async (req, res) => {
    const suppliers = await Supplier.find({});
    res.status(200).json(new apiResponse(200, "Suppliers retrieved successfully", suppliers));
  });

  const addSupplier = asyncHandler(async (req, res) => {
    const { name, email, phone, status, contactInfo } = req.body;
  
    if (!name || !email || !phone || !status || !contactInfo) {
      throw new apiError(400, "All fields are required");
    }
  
    const newSupplier = new Supplier({ name, email, phone, status, contactInfo });
    const createdSupplier = await newSupplier.save();
  
    res.status(201).json(new apiResponse(201, "Supplier added successfully", createdSupplier));
  });

const updateSupplier = asyncHandler(async (req, res) => {
const { id } = req.params;
const { name, email, phone, status, contactInfo } = req.body;

const supplier = await Supplier.findById(id);
  
if (!supplier) {
  throw new apiError(404, "Supplier not found");
}
  
supplier.name = name || supplier.name;
supplier.email = email || supplier.email;
supplier.phone = phone || supplier.phone;
supplier.status = status || supplier.status;
supplier.contactInfo = contactInfo || supplier.contactInfo;
  
const updatedSupplier = await supplier.save();
  
res.status(200).json(new apiResponse(200, "Supplier updated successfully", updatedSupplier));
  });


export{
    supplierList,
    addSupplier,
    updateSupplier
    }