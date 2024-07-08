import express from "express";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));


import inventoryRoute from "./routes/inventory.routes.js";

app.use('/api/v1', inventoryRoute);

export { app };