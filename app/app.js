import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
import express from "express";

import dbConnect from "../config/dbConnect.js";
import { globalErrhandler, notFound } from "../middlewares/globalErrHandler.js";


//db connect
dbConnect();
const app = express();
//cors
app.use(cors());

// pass incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve static files
// app.use(express.static("public"));
// home route
// app.get("/", (req, res) => {
//   res.sendFile(path.join("public", "index.html"));
// });


// custom routes
// app.use("/api/v1/users", usersRoute);


// error middleware
app.use(notFound);
app.use(globalErrhandler);
export default app;
