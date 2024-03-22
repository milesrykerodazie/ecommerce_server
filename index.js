//const express = require("express");
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());

const db = process.env.DATABASE_URL;
const MYPORT = process.env.PORT;

//this is my produczt route
app.use("/products", productRoute);
app.use("/user", userRoute);

mongoose
  .connect(db)
  .then(() => {
    app.listen(MYPORT, () => {});
  })
  .catch(() => {
    console.log("Not Connected TO DATABASE");
  });
