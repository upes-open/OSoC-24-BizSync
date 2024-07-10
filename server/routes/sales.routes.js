import {Router} from "express";

import{
    salesList,
    customerDetails,
    salesReturn,
    salesReport
} from "../controllers/sales.controller.js"

const router=Router();


router.route("/orders").get(salesList);
router.route("/customers/:id").get(customerDetails);
router.route("/returns").post(salesReturn);
router.route("/reports/sales").get(salesReport);

export default router;