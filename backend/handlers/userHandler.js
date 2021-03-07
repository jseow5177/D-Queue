import jwt from "jsonwebtoken";
import { io } from "./socketHandler.js";

import {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  DuplicateFieldError,
} from "../utils/errorResponse.js";
import { User } from "../models/userModel.js";
import { Restaurant } from "../models/restaurantModel.js";
import { Queue, QUEUESTATE } from "../models/queueModel.js";

// ------------- Auth Handler -------------

export const checkAuthHandler = async (req, res, next) => {
  const token = req.cookies.token;
  res.cookie("token", token, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ success: true, message: "You are logged in" });
};

export const signupHandler = async (req, res, next) => {
  const {
    email,
    password,
    first_name,
    last_name,
    contact_no,
    is_admin,
  } = req.body;

  try {
    const user = await User.create({
      email,
      password,
      first_name,
      last_name,
      contact_no,
      is_admin,
    });

    sendJWTtoken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Please provide an email and password"));
  }

  try {
    const user = await await User.findOne({ email }).populate("restaurant", [
      "restaurantName",
    ]);

    if (!user) {
      return next(new UnauthorizedError("Invalid credentials"));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new UnauthorizedError("Invalid credentials"));
    }

    sendJWTtoken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = (req, res, next) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordHandler = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new NotFoundError("Email could not be found"));
    }

    const signedToken = user.getResetPasswordToken();

    await user.save();

    const resetURL = `http://localhost:3000/passwordreset/${signedToken}`;

    res.status(200).json({ success: true, message: resetURL });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const signedToken = req.params.signedToken;

  try {
    const decoded = jwt.verify(signedToken, process.env.JWT_SECRET);

    const user = await User.findOne({ resetPasswordToken: decoded.token });

    if (!user) {
      return next(new BadRequestError("Invalid Reset Token"));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;

    await user.save();

    // Sign user out after password reset
    res.cookie("token", "", { maxAge: 1 });
    res.status(201).json({
      success: true,
      data: "Password Reset Success",
    });
  } catch (error) {
    next(error);
  }
};

export const privateHandler = async (err, req, res, next) => {
  if (err) return next(err);

  res
    .status(200)
    .json({ success: true, message: "You have access to protected route" });
};

// ------------- Queue Handler -------------

export const enterQueueHandler = async (req, res, next) => {
  const { userID, restaurantID, pax } = req.body;

  try {
    const isInQueue = await Queue.findOne({
      $and: [
        { restaurant: restaurantID },
        { user: userID },
        { state: { $lte: QUEUESTATE.NOTIFIED } },
      ],
    });

    if (isInQueue) {
      return next(new DuplicateFieldError("User is already in queue"));
    }

    let queue = await Queue.create({
      restaurant: restaurantID,
      user: userID,
      pax: pax,
      enter_queue_time: new Date().getTime(),
      state: QUEUESTATE.WAITING,
    });

    queue = await Queue.populate(queue, { path: "user" });

    io.of(restaurantID).emit("user enter queue", queue);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const getQueueListHandler = async (req, res, next) => {
  const { userID } = req.body;

  try {
    let queueList = await Queue.find({
      $and: [{ user: userID }, { state: { $lte: QUEUESTATE.NOTIFIED } }],
    })
      .populate("restaurant", ["restaurantName", "contact", "image"])
      .lean();

    queueList = await Promise.all(
      queueList.map(async (queue) => {
        let queueNum = await getQueueNumber(queue);

        if (queueNum instanceof Error) {
          return new NotFoundError("Unable to find queue number");
        }

        return { ...queue, queueNum: queueNum };
      })
    );

    res.status(200).json(queueList);
  } catch (error) {
    next(error);
  }
};

const sendJWTtoken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  user.password = "";
  res.cookie("token", token, { maxAge: 900000, httpOnly: true });
  res.status(statusCode).json({ success: true, token, user });
};

const getQueueNumber = async (queue) => {
  try {
    const queuing_users = await Queue.find({
      $and: [
        { restaurant: queue.restaurant },
        { enter_queue_time: { $lt: queue.enter_queue_time } },
        { state: { $lte: QUEUESTATE.NOTIFIED } },
      ],
    });

    return queuing_users.length;
  } catch (error) {
    return error;
  }
};
