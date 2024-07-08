import { Router } from "express";

const router = Router();

router.route("/financials").get();

router.route("/financials").post();

router.route("/financials/:id").put();

router.route("/reports").get();

export default router;
