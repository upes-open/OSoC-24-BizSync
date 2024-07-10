import { Router } from "express";

const router = Router();

router.route("/reports/financial").get();

router.route("/reports/staff").get();

router.route("/reports/inventory").get();

router.route("/reports/sales").get();

export default router;
