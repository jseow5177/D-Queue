import { Restaurant } from "../models/restaurantModel.js";
import { User } from "../models/userModel.js";
import { NotFoundError } from "../utils/errorResponse.js";
import { Queue, QUEUESTATE } from "../models/queueModel.js";
import { io } from "./socketHandler.js";
import { dataUri, cloudinary } from "../middleware/cloudinaryConfig.js";
import { list_to_obj } from "../utils/commonUtil.js";

export const registerHandler = async (req, res, next) => {
  let urlArr = [];
  if (req.files) {
    const files = req.files;

    urlArr = await Promise.all(
      files.map(async (file) => {
        try {
          const uri = await dataUri(file.buffer);

          const fileContent = uri.content;

          const uploadFile = await cloudinary.v2.uploader.upload(fileContent);

          return uploadFile.url;
        } catch (error) {
          console.log(error);
        }
      })
    );
  }

  try {
    const newRestaurant = await Restaurant.create({
      restaurantName: req.body["Restaurant Name"],
      address1: req.body["Address Line 1"],
      address2: req.body["Address Line 2"],
      city: req.body["City"],
      state: req.body["State"],
      country: req.body["Country"],
      postCode: req.body["Post Code"],
      contact: req.body["Contact Number"],
      email: req.body["Email"],
      openingHours: JSON.stringify(req.body["openingHours"]),
      priceRange: req.body["Price Range"],
      category: req.body["Food Category"],
      admin: req.body["admin"],
      image: urlArr,
    });

    let user = await User.findById(req.body.userID);

    user.restaurant = newRestaurant._id;
    user = await user.save();

    res.status(200).json({
      restaurantID: newRestaurant._id,
      restaurantName: newRestaurant.restaurantName,
      image: newRestaurant.image,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const retrieveHandler = async (req, res, next) => {
  const restaurantID = req.query.restaurantID;
  try {
    const restaurantObj = await Restaurant.findOne({
      _id: restaurantID,
    }).lean();
    
    const queueList = await Queue.find({
      $and: [
        { restaurant: restaurantID },
        { state: { $lte: QUEUESTATE.NOTIFIED } },
      ],
    });

    restaurantObj["queueNum"] = queueList.length;
    
    if (!restaurantObj)
      return next(
        new NotFoundError(`No restaurant with name ${restaurantName} found`)
      );

    res.json({
      ...restaurantObj,
      // openingHours: JSON.parse(restaurantObj._doc.openingHours),
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantListHandler = async (req, res, next) => {
  // Pagination
  let page_size = parseInt(req.query.page_size);
  let page_num = parseInt(req.query.page_num);
  let skips = page_size * (page_num - 1);

  try {
    let restaurantList = await Restaurant.find()
      .sort({ _id: -1 })
      .skip(skips)
      .limit(page_size)
      .lean();

    const queueList = await Queue.find({
      $and: [{ state: { $lte: QUEUESTATE.NOTIFIED } }],
    });

    const queue_objs = list_to_obj(queueList, "restaurant");

    restaurantList = restaurantList.map((restaurant) => {
      return {
        ...restaurant,
        queueNum: queue_objs[restaurant._id]
          ? queue_objs[restaurant._id].length
          : 0,
      };
    });

    if (!restaurantList) {
      return next(new NotFoundError("No restaurant is found"));
    }
    res.status(200).json(restaurantList);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const getQueueListHandler = async (req, res, next) => {
  const { restaurantID } = req.query;

  try {
    let queueList = await Queue.find({
      $and: [
        { restaurant: restaurantID },
        { state: { $lte: QUEUESTATE.NOTIFIED } },
      ],
    }).populate("user", [
      "_id",
      "email",
      "last_name",
      "first_name",
      "contact_no",
    ]);

    if (!queueList) {
      return next(new NotFoundError("Failed to get queue list"));
    }

    res.status(200).json(queueList);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateQueueStateHandler = async (req, res, next) => {
  const { userID, restaurantID, queueState } = req.body;

  try {
    let queue = await Queue.findOne({
      $and: [
        { restaurant: restaurantID },
        { user: userID },
        { state: { $lte: QUEUESTATE.NOTIFIED } },
      ],
    });

    if (!queue) {
      return next(new NotFoundError("Cannot find user in queue"));
    }

    queue.state = queueState;

    if (queueState === QUEUESTATE.ENTERED) {
      queue.enter_restaurant_time = new Date().getTime();
    } else if (queueState === QUEUESTATE.EXITED) {
      queue.exit_restaurant_time = new Date().getTime();
    }

    queue = await queue.save();

    if (queueState === QUEUESTATE.NOTIFIED) {
      io.of(userID).emit("notify", queue);
    } else {
      io.of(restaurantID).emit("update queue", queue);
      io.of(userID).emit("update queue", queue);

      let full_queue = await Queue.find({
        $and: [
          { restaurant: restaurantID },
          { state: { $lte: QUEUESTATE.NOTIFIED } },
        ],
      });

      full_queue.forEach((queue) => {
        io.of(queue.user).emit("update queue", queue);
      });
    }

    res
      .status(200)
      .json({ success: true, message: `Updated queue state to ${queueState}` });
  } catch (error) {
    return next(error);
  }
};
