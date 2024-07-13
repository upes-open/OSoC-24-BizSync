import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from "../controllers/orders.controller.js";

const router = Router();

router.route("/orders").get(getAllOrders);

router.route("/orders").post(createOrder);

router.route("/orders").put(updateOrder);

router.route("/orders/:id").get(getOrder);

export default router;
