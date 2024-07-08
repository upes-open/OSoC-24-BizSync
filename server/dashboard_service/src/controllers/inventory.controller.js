import { InventoryItem } from "../models/inventory.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getInventory = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const inventoryItems = await InventoryItem.find({ user: userId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { items: inventoryItems }, "Fetched successfully")
    );
});

const addItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, quantity } = req.body;

  const existingItem = await InventoryItem.findOne({ name });

  if (existingItem) throw new ApiError(400, "Duplicate Item");

  const item = await InventoryItem.create({
    name,
    quantity: Number.parseInt(quantity),
    user: userId,
  });

  if (!item)
    throw new ApiError(500, "Something went wrong while creating item");

  return res
    .status(200)
    .json(new ApiResponse(200, { item }, "Item created successfully"));
});

const updateItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const itemId = req.params.id;
  const { name, status, reorderLevel, quantity } = req.body;

  const item = await InventoryItem.findOne({
    $and: [{ _id: itemId }, { user: userId }],
  });

  if (!item) throw new ApiError(404, "Item not found");

  item.name = name !== undefined ? name : item.name;
  item.status = status !== undefined ? status : item.status;
  item.reorderLevel =
    reorderLevel !== undefined ? reorderLevel : item.reorderLevel;
  item.quantity = quantity !== undefined ? quantity : item.quantity;

  await item.save();

  const updatedItem = await InventoryItem.findOne({
    $and: [{ _id: itemId }, { user: userId }],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { updateItem }, "Item updated"));
});

const getLowStock = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const lowStockItems = await InventoryItem.find({
    user: userId,
    quantity: { $lte: reorderLevel },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { lowStockItems }, "Fetched successfully"));
});

export { getInventory, addItem, updateItem, getLowStock };
