import express from "express";
import {
  getQueueListHandler,
  getRestaurantListHandler,
  registerHandler,
  retrieveHandler,
  updateQueueStateHandler,
} from "../handlers/restaurantHandler.js";
import multer from "multer";

const restaurantRouter = express.Router();

const upload = multer({});
restaurantRouter.get("/restaurantList", getRestaurantListHandler);
restaurantRouter.get("/retrieve", retrieveHandler);
restaurantRouter.get("/queueList", getQueueListHandler);
restaurantRouter.post("/register", upload.array("upload", 10), registerHandler);
restaurantRouter.post("/updateQueueState", updateQueueStateHandler);

export default restaurantRouter;
