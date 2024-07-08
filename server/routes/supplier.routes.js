import { Router } from "express";

import {
  supplierList,
  addSupplier,
  updateSupplier
  } from "../controllers/supplier.controller.js";

const router = Router();

//retrieving and add to the inventory
router.route("/suppliers").get(supplierList);
router.route("/suppliers").post(addSupplier);

// update the inventory which is present
router.route("/inventory/:id").put(updateSupplier);



export default router;