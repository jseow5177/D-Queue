import express from "express";
import {
  getQueueListHandler,
  getRestaurantListHandler,
  registerHandler,
  retrieveHandler,
  updateQueueStateHandler,
} from "../handlers/restaurantHandler.js";
import { multerparser } from "../middleware/cloudinaryConfig.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/restaurantList", getRestaurantListHandler);
restaurantRouter.get("/retrieve", retrieveHandler);
restaurantRouter.get("/queueList", getQueueListHandler);
restaurantRouter.post(
  "/register",
  multerparser.array("upload", 10),
  registerHandler
);
restaurantRouter.post("/updateQueueState", updateQueueStateHandler);

export default restaurantRouter;
