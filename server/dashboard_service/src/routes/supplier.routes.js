import { Router } from "express";
import {
  addSupplier,
  getSuppliers,
  updateSupplier,
} from "../controllers/supplier.controller.js";

const router = Router();

router.route("/suppliers").get(getSuppliers);

router.route("/suppliers").post(addSupplier);

router.route("/suppliers/:id").put(updateSupplier);

export default router;
