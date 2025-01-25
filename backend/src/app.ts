import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from "./config/dbConnect";
import adminRoutes from "./routes/admin/adminRoutes.routes";
import userRoutes from "./routes/user/userRoutes.routes";
import eventRoutes from "./routes/event/eventRoutes.routes";

const app: Application = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["*"],
  })
);

app.use("/api", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", eventRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
});

export default app;
