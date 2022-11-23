
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postRouter from "./routes/posts.js";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";


dotenv.config();
const app = express();
app.use(cors());

const url = process.env.DB_URL;
const port = process.env.PORT || 8000;

app.use(express.json({limit: "30mb" ,extended: true}))
app.use(express.urlencoded({limit: "30mb" ,extended: true}))

app.use("/posts", postRouter);
app.use("/user", userRouter);

mongoose.connect(url).then(() => {
    console.log("connected to database");
    app.listen(port, () => console.log(`server run on http://localhost:${port}`))
}).catch((error) => {
    console.log(error.message)
})
