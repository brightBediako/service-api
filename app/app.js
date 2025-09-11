import express from "express";
import dotenv from "dotenv";

import authRoute from "../routes/auth.route.js";
import userRoute from "../routes/user.route.js";
import gigRoute from "../routes/gig.route.js";
import orderRoute from "../routes/order.route.js";
import conversationRoute from "../routes/conversation.route.js";
import messageRoute from "../routes/message.route.js";
import reviewRoute from "../routes/review.route.js";

import cors from "cors";
import cookieParser from "cookie-parser";

import dbConnect from "../config/dbConnect.js";
import { globalErrhandler, notFound } from "../middlewares/globalErrHandler.js";

dotenv.config();
//db connect
dbConnect();
const app = express();

//cors
app.use(cors());

// pass incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Joydome API is running",
    timestamp: new Date().toISOString(),
  });
});

// custom routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

// error middleware
// not found middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;
