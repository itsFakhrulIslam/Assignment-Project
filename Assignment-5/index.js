import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import router from "./routes/api.js";
import {
  DATABASE,
  MAX_JSON_SIZE,
  PORT,
  REQUEST_NUMBER,
  REQUEST_TIME,
  URL_ENCODE,
  WEB_CACHE,
} from "./app/config/config.js";

const app = express();

// app use middlewares area
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(fileUpload());

// rate limiting of time & number area
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });

// web caching area
app.set("etag", WEB_CACHE);

// database connection area
mongoose
  .connect(DATABASE, { autoIndex: true })
  .then(() => {
    console.log("Database connect successfully!");
  })
  .catch(() => {
    console.log("Database connecting failed!");
  });

// Routes Area
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running successfully on ${PORT} port...`);
});
