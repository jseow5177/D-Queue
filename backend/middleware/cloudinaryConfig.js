import multer from "multer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import cloudinary from "cloudinary";
import Datauri from "datauri/parser.js";

const dataUri = async (buffer) => {
  try {
    const dUri = new Datauri();
    const uri = await dUri.format(".png", buffer);

    return uri;
  } catch (error) {
    return error;
  }
};

const {
  CLOUDINARY_HOST,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

const cloudinaryConfig = (req, res, next) => {
  cloudinary.config({
    cloud_name: CLOUDINARY_HOST,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  next();
};

const uploader = cloudinary.uploader;
const crop = cloudinary.image;

const storage = multer.memoryStorage();
const multerparser = multer({ storage });

export { dataUri, multerparser, cloudinary, cloudinaryConfig, crop };
