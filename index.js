//const express = require("express");
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoute from "./routes/productRoutes.js";
import authRoute from "./routes/authRoutes.js";
import usersRoute from "./routes/usersRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
//middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecommerce-front-end-test.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

const db = process.env.DATABASE_URL;
const MYPORT = process.env.PORT;

//this is my produczt route
app.use("/products", productRoute);
app.use("/auth", authRoute);
app.use("/users", usersRoute);

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to DB");
    app.listen(MYPORT, () => {
      console.log(`Listening to port ${MYPORT}`);
    });
  })
  .catch(() => {
    console.log("Not Connected TO DATABASE");
  });
