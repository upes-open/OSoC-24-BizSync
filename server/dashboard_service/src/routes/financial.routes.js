import { Router } from "express";
import {
  addFinancialRecords,
  getFinancialRecords,
  getReport,
  updateFinancialRecord,
} from "../controllers/financialRecord.controller.js";

const router = Router();

router.route("/financials").get(getFinancialRecords);

router.route("/financials").post(addFinancialRecords);

router.route("/financials/:id").put(updateFinancialRecord);

router.route("/reports").get(getReport);

export default router;
