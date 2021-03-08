import express from "express";
import {
  loginHandler,
  signupHandler,
  privateHandler,
  forgotPasswordHandler,
  resetPassword,
  logoutHandler,
  enterQueueHandler,
  getQueueListHandler,
  checkAuthHandler,
} from "../handlers/userHandler.js";
import { isAuthenticated } from "../middleware/auth.js";
var userRouter = express.Router();

// Auth
userRouter.get("/checkAuth", isAuthenticated, checkAuthHandler);
userRouter.get("/logout", logoutHandler);
userRouter.get("/private-test", isAuthenticated, privateHandler);

userRouter.post("/forgotPassword", forgotPasswordHandler);
userRouter.post("/login", loginHandler);
userRouter.post("/signup", signupHandler);
userRouter.post("/resetPassword/:signedToken", resetPassword);

// Queue
userRouter.post("/queueList", getQueueListHandler);
userRouter.post("/enterQueue", enterQueueHandler);

export default userRouter;
