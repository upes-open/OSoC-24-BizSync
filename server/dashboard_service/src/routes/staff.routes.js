import { Router } from "express";
import {
  addStaff,
  getStaff,
  updateStaff,
} from "../controllers/staff.controller.js";

const router = Router();

router.route("/staff").get(getStaff);

router.route("/staff").post(addStaff);

router.route("/staff/:id").put(updateStaff);

export default router;
