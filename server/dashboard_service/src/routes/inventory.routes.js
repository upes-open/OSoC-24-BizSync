import { Router } from "express";
import {
  addItem,
  getInventory,
  getLowStock,
  updateItem,
} from "../controllers/inventory.controller";

const router = Router();

router.route("/inventory").get(getInventory);

router.route("/inventory").post(addItem);

router.route("/inventory/:id").put(updateItem);

router.route("/inventory/low").get(getLowStock);

export default router;
