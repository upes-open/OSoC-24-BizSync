import { Router } from "express";

import {
  finRecord,
  addFinRecord,
  updateFinRecord,
  finReport
  } from "../controllers/financial.controller.js";

const router = Router();

//retrieving and add to financials
router.route("/financials").get(finRecord);
router.route("/financials").post(addFinRecord);

// update the rec which is present
router.route("/financials/:id").put(updateFinRecord);
router.route("/reports").get(finReport);


export default router;