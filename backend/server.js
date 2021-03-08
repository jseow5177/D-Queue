import "dotenv/config.js";
import mongoose from "mongoose";

import config from "./config.js";
import app from "./app.js";
import userRouter from "./routes/userRouter.js";
import restaurantRouter from "./routes/restaurantRouter.js";
import errorHandler from "./handlers/errorHandler.js";
import { initSocket } from "./handlers/socketHandler.js";
import express from "express";
import path from "path"

const PORT = config.port;
const mongoUri = config.mongoUri;

async function run() {
  try {
    // Connect to mongo database
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to database!");

    // Routes
    app.use("/api/user", userRouter);
    app.use("/api/restaurant", restaurantRouter);

    // Error Handler (Must be last piece of middleware)
    app.use(errorHandler);

    // if (process.env.NODE_ENV === "production") {
      const __dirname = path.resolve();
      const dir = path.join(__dirname, "frontend/build");
      
      app.use(express.static(dir));
      app.get("*", (req, res) => {
        
        const path_dir = path.join(
          __dirname,
          "frontend",
          "build",
          "index.html"
        );
        
        res.sendFile(path_dir);
      });
    // }

    // Listen to port
    const server = app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`App is listening at port ${PORT}!`);
    });

    const io = initSocket(server);
  } catch (error) {
    console.log(error);
  }
}

run();
