import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middlewares/auth.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(verifyJWT());

import inventoryRoute from "./routes/inventory.routes.js";
import supplierRoute from "./routes/supplier.routes.js";
import staffRoute from "./routes/staff.routes.js";

app.use("/api/v1", inventoryRoute);
app.use("api/v1", supplierRoute);
app.use("api/v1", staffRoute);

export { app };
