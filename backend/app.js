import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { cloudinaryConfig } from "./middleware/cloudinaryConfig.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("*", cloudinaryConfig);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/build/'))
}

export default app;
