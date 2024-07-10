import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Sales } from "../models/sales.model.js";
import {User} from "../auth_service/src/models/user.model.js"

const salesList = asyncHandler(async (req, res) => {
  const salesOrders = await Sales.find({});
  res.status(200).json(new apiResponse(200, "Sales orders retrieved successfully", salesOrders));
});


const customerDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const customer = await User.findById(id);

  if (!customer) {
    throw new apiError(404, "Customer not found");
  }
  res.status(200).json(new apiResponse(200, "Customer details retrieved successfully", customer));
});


const salesReturn = asyncHandler(async (req, res) => {
  const { orderId, items } = req.body;
  const salesOrder = await Sales.findById(orderId);
  if (!salesOrder) {
    throw new apiError(404, "Sales order not found");
  }
  // Update
  items.forEach((returnItem) => {
    const orderItem = salesOrder.items.find(item => item.productId === returnItem.productId);
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

  res.status(200).json(new apiResponse(200, "Return processed successfully", updatedSalesOrder));
});

const salesReport = asyncHandler(async (req, res) => {
  const { date } = req.query;
  //for demo purpose only 
  if (!date) {
    throw new apiError(400, "Date query parameter is required");
  }
  const records = await Sales.find({ date: new Date(date) });
  res.status(200).json(new apiResponse(200, "Reports generated successfully", records));
});

export {
  salesList,
  customerDetails,
  salesReturn,
  salesReport
};
