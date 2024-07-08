import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orders = await SalesOrder.find({ user: userId }).sort({ date: -1 });
  return res
    .status(200)
    .json(
      new ApiResponse(200, { orders }, "Sales orders fetched successfully")
    );
});

const getCustomer = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.id;
  const order = await SalesOrder.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { customer: order.customer },
        "Customer details fetched successfully"
      )
    );
});

const processReturn = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { orderNumber, reason } = req.body;

  if (!orderNumber || !reason) {
    throw new ApiError(400, "Order number and reason are required");
  }

  const order = await SalesOrder.findOne({ orderNumber, user: userId });
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.status === "returned") {
    throw new ApiError(400, "Order has already been returned");
  }

  order.status = "returned";
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { order }, "Return processed successfully"));
});

const getSalesReport = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { startDate, endDate, category } = req.query;

  let query = { user: userId };

  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  if (category) {
    query["items.productId"] = category;
  }

  const orders = await SalesOrder.find(query);

  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalSales / totalOrders || 0;

  const salesByDate = orders.reduce((acc, order) => {
    const date = order.date.toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + order.totalAmount;
    return acc;
  }, {});

  const topSellingProducts = orders.reduce((acc, order) => {
    order.items.forEach((item) => {
      acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
    });
    return acc;
  }, {});

  const sortedTopSellingProducts = Object.entries(topSellingProducts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  const report = {
    totalSales,
    totalOrders,
    averageOrderValue,
    salesByDate,
    topSellingProducts: sortedTopSellingProducts,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, { report }, "Sales report generated successfully")
    );
});

export { getCustomer, getOrders, processReturn, getSalesReport };
