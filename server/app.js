import express from "express";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


import inventoryRoute from "./routes/inventory.routes.js";
import finRoute from "./routes/financial.routes.js";
import supplierRoute from "./routes/supplier.routes.js";



app.use('/api/v1', inventoryRoute);
app.use('/api/v1/fin_records', finRoute);
app.use('/api/v1/supplier_records', supplierRoute);

export { app };