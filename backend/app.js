import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { cloudinaryConfig } from "./middleware/cloudinaryConfig.js";
import path from "path"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("*", cloudinaryConfig);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static('frontend/build'))
    app.get("*", (req, res) => {
        console.log(__dirname)
        const path_dir = path.join(__dirname, "frontend", "build", "index.html");
        console.log(path_dir)
        res.sendFile(path_dir)
    })
}

export default app;
