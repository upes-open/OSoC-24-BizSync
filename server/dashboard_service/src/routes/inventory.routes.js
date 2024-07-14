import { Router } from "express";

import {
  inventoryList,
  addInventory,
  updateInventory,
  stockCheck,
} from "../controllers/inventory.controller.js";

const router = Router();

//retrieving and add to the inventory
router.route("/inventory").get(inventoryList);
router.route("/inventory").post(addInventory);

// update the inventory which is present
router.route("/inventory/:id").put(updateInventory);
router.route("/inventory/low").post(stockCheck);

export default router;
