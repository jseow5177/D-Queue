import { Restaurant } from "../models/restaurantModel.js";
import { NotFoundError } from "../utils/errorResponse.js";
import { Queue, QUEUESTATE } from "../models/queueModel.js";
import sharp from "sharp"

export const registerHandler = async (req, res, next) => {
  // const openingHoursFormat = [
  //     [
  //         { opening: 5, closing: 5 },
  //         { opening: 10, closing: 10 }
  //     ],
  //     [
  //         { opening: 12, closing: 12 }
  //     ]
  // ]

  try {
    const imgArr = [];
    const _ = await Promise.all(
      req.files.map(
        async (file) => {
          const imgBuffer = await sharp(file.buffer).resize({ width: 300, height: 300}).png().toBuffer()
          imgArr.push(imgBuffer);
        }
      )
    );
    console.log(imgArr)
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
      admin: req.body["admin"],
      image: imgArr,
    });
    console.log(newRestaurant)
    res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

export const retrieveHandler = async (req, res, next) => {
  const restaurantId = req.query.restaurantId;

  const restaurantObj = await Restaurant.findOne({ _id: restaurantId });
  if (!restaurantObj)
    return next(
      new NotFoundError(`No restaurant with name ${restaurantName} found`)
    );

  res.json({
    ...restaurantObj._doc,
    openingHours: JSON.parse(restaurantObj._doc.openingHours),
    success: true,
  });
};

export const getRestaurantListHandler = async (req, res, next) => {
  // Pagination
  let page_size = parseInt(req.query.page_size);
  let page_num = parseInt(req.query.page_num);
  let skips = page_size * (page_num - 1);

  try {
    const restaurantList = await Restaurant.find()
      .sort({ _id: -1 })
      .skip(skips)
      .limit(page_size);

    if (!restaurantList) {
      return next(new NotFoundError("No restaurant is found"));
    }
    res.status(200).json(restaurantList);
  } catch (error) {
    return next(error);
  }
};

export const getQueueListHandler = async (req, res, next) => {
  const { restaurantID } = req.body;

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

    res
      .status(200)
      .json({ success: true, message: `Updated queue state to ${queueState}` });
  } catch (error) {
    return next(error);
  }
};

export const deleteRestaurantHandler = async (req, res, next) => {
  try{
    
    const result = Restaurant.remove();
    res.status(200).json(result);
  } catch (error) {
    return next(error)
  }
}