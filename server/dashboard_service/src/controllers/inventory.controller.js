import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Inventory } from "../models/inventory.model.js";

//Retrieve list of inventory items
const inventoryList = asyncHandler(async (req, res) => {
  const items = await Inventory.find();
  res.status(200).json(new apiResponse(200, "Inventory items retrieved successfully", items));
});

//Add a new inventory item
const addInventory = asyncHandler(async (req, res) => {
  const { name, quantity,reorderLevel,status } = req.body;

  if (!name || !quantity || !reorderLevel || !status) {
    throw new apiError(400, "All fields (name, quantity,reorderLevel,status) are required");
  }

  const newItem = new Inventory({ name, quantity, reorderLevel,status });
  const createdItem = await newItem.save();
  
  res.status(201).json(new apiResponse(201, "Inventory item added successfully", createdItem));
});



//Update an existing inventory item
const updateInventory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, quantity,reorderLevel,status } = req.body;  

  const item = await Inventory.findById(id);

  if (!item) {
    throw new apiError(404, "Inventory item not found");
  }

  item.name = name || item.name;
  item.quantity = quantity || item.quantity;
  item.reorderLevel = reorderLevel || item.reorderLevel;
  item.status = status|| item.status;
  

  const updatedItem = await item.save();
  
  res.status(200).json(new apiResponse(200, "Inventory item updated successfully", updatedItem));
});



//Retrieve inventory items that are low in stock
const stockCheck = asyncHandler(async (req, res) => {
  const lowStockThreshold = 10; //for low stock
  const lowStockItems = await Inventory.find({ quantity: { $lt: lowStockThreshold } });
  res.status(200).json(new apiResponse(200, "Low stock inventory items retrieved successfully", lowStockItems));
});

export {
  inventoryList,
  addInventory,
  updateInventory,
  stockCheck
  }

