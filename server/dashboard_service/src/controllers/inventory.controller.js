import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Inventory } from "../models/inventory.model.js";

//Retrieve list of inventory items
const inventoryList = asyncHandler(async (req, res) => {
  const items = await Inventory.find();
  res
    .status(200)
    .json(
      new ApiResponse(200, items, "Inventory items retrieved successfully")
    );
});

//Add a new inventory item
const addInventory = asyncHandler(async (req, res) => {
  const { name, quantity, reorderLevel, status } = req.body;

  if (!name || !quantity || !reorderLevel || !status) {
    throw new ApiError(
      400,
      "All fields (name, quantity,reorderLevel,status) are required"
    );
  }

  const newItem = new Inventory({ name, quantity, reorderLevel, status });
  const createdItem = await newItem.save();

  res
    .status(201)
    .json(
      new ApiResponse(201, createdItem, "Inventory item added successfully")
    );
});

//Update an existing inventory item
const updateInventory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, quantity, reorderLevel, status } = req.body;

  const item = await Inventory.findById(id);

  if (!item) {
    throw new ApiError(404, "Inventory item not found");
  }

  item.name = name || item.name;
  item.quantity = quantity || item.quantity;
  item.reorderLevel = reorderLevel || item.reorderLevel;
  item.status = status || item.status;

  const updatedItem = await item.save();
  console.log(updatedItem);

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedItem, "Inventory item updated successfully")
    );
});

//Retrieve inventory items that are low in stock
const stockCheck = asyncHandler(async (req, res) => {
  const lowStockThreshold = 10; //for low stock
  const lowStockItems = await Inventory.find({
    quantity: { $lt: lowStockThreshold },
  });
  console.log(lowStockItems);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        lowStockItems,
        "Low stock inventory items retrieved successfully"
      )
    );
});

export { inventoryList, addInventory, updateInventory, stockCheck };
