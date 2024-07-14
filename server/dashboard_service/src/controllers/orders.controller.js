import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/orders.model.js";

const getAllOrders = asyncHandler(async (req, res) => {
  //   const { title, quantity, value, item } = req.body;
  const userId = req.user._id;

  const orders = await Order.find({ user: userId });

  return res.status(200).json(new ApiResponse(200, orders, "Success"));
});

const createOrder = asyncHandler(async (req, res) => {
  const { title, quantity, value, item } = req.body;
  const userId = req.user._id;

  if (!title || !quantity || !value || !item)
    throw new ApiError(400, "All fields are required");

  const order = await Order.create({
    title,
    quantity,
    value,
    item,
    user: userId,
  });

  const createdOrder = await Order.findById(order._id);

  if (!createdOrder) return new ApiError(500, "Something went wrong");

  return res.status(200).json(new ApiResponse(200, createdOrder, "Success"));
});

const updateOrder = asyncHandler(async (req, res) => {
  const { title, quantity, value, item, orderId } = req.body;
  const userId = req.user._id;

  if (!orderId) throw new ApiError(400, "Order Id is required");

  const order = await Order.findById(orderId);

  if (!order) throw new ApiError(404, "Order not found");

  order.title = title !== undefined ? title : order.title;
  order.quantity = quantity !== undefined ? quantity : order.quantity;
  order.value = value !== undefined ? value : order.value;
  order.item = item !== undefined ? item : order.item;

  await order.save();

  const updatedOrder = await Order.findById(order._id);

  if (!updatedOrder) throw new ApiError(500, "Something went wrong");

  return res.status(200).json(new ApiResponse(200, updatedOrder, "Success"));
});

const getOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;

  if (!orderId) throw new ApiError(404, "OrderId not found");

  const order = await Order.findById(orderId);

  if (!order) throw new ApiError(404, "Order not found");

  return res.status(200).json(new ApiResponse(200, order, "Success"));
});

export { getAllOrders, createOrder, updateOrder, getOrder };
