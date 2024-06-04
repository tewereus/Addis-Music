import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";

import authRoute from "./routes/authRoute.js";
import musicRoute from "./routes/musicRoute.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const PORT = process.env.PORT || 8001;
const app = express();
connectDB();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/music", musicRoute);

app.listen(PORT, (req, res) => {
  console.log(`listening to PORT ${PORT}`);
});

app.use(notFound);
app.use(errorHandler);
