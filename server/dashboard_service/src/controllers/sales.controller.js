import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Sales } from "../models/sales.model.js";
import { User } from "../models/user.model.js";

const salesList = asyncHandler(async (req, res) => {
  const salesOrders = await Sales.find({});
  res
    .status(200)
    .json(
      new ApiResponse(200, salesOrders, "Sales orders retrieved successfully")
    );
});

// redundant route: already have customer object in the sales
const customerDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const customer = await User.findById(id);

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Customer details retrieved successfully", customer)
    );
});

const salesReturn = asyncHandler(async (req, res) => {
  const { orderId, items } = req.body;
  console.log({ orderId, items });
  const salesOrder = await Sales.findById(orderId);
  if (!salesOrder) {
    throw new ApiError(404, "Sales order not found");
  }
  // Update
  items.forEach((returnItem) => {
    const orderItem = salesOrder.items.find(
      (item) => item.productId === returnItem.productId
    );
    if (orderItem) {
      orderItem.quantity -= returnItem.quantity;
      if (orderItem.quantity < 0) {
        orderItem.quantity = 0;
      }
    }
  });

  // order status to "Returned"
  salesOrder.status = "Returned";

  const updatedSalesOrder = await Sales.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedSalesOrder, "Return processed successfully")
    );
});

const salesReport = asyncHandler(async (req, res) => {
  const date = req.query.date;
  //for demo purpose only
  console.log(req.query);
  if (!date) {
    throw new ApiError(400, "Date query parameter is required");
  }
  const records = await Sales.find({ date: new Date(date) });
  res
    .status(200)
    .json(new ApiResponse(200, records, "Reports generated successfully"));
});

export { salesList, customerDetails, salesReturn, salesReport };
