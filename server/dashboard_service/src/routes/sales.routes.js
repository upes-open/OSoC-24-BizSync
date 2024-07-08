import { Router } from "express";
import {
  getCustomer,
  getOrders,
  getSalesReport,
  processReturn,
} from "../controllers/sales.controller.js";

const router = Router();

router.route("/sales/orders").get(getOrders);

router.route("/customers/:id").get(getCustomer);

router.route("/returns").post(processReturn);

router.route("/report/sales").get(getSalesReport);

export default router;
