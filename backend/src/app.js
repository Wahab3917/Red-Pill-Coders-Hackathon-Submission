import express from "express";
import cookieParser from "cookie-parser";
import ResponseHandler from "./helpers/ResponseHandler.js";
import dbConnect from "./config/dbConnect.js";
import sendEmail from "./config/sendEmail.js";
import cors from "cors";

const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["*"],
  })
);

app.get("/", async (req, res) => {
  await sendEmail("uneebbhatti3@gmail.com", "Test", "Hello", "Hello");
  ResponseHandler.send(res, 200, "Hello World", {}, null);
});

export default app;
