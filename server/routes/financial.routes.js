import { Router } from "express";

import {
  finRecord,
  addFinRecord,
  updateFinRecord,
  finReport
  } from "../controllers/inventory.controller.js";

const router = Router();

//retrieving and add to the inventory
router.route("/financials").get(finRecord);
router.route("/financials").post(addFinRecord);

// update the inventory which is present
router.route("/financials/:id").put(updateFinRecord);
router.route("/reports").get(finReport);


export default router;