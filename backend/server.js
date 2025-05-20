import bodyParser from "body-parser";
import express from "express";
import "dotenv/config";
import cors from "cors";
import ApplicationRouter from "./Routes/ApplicationRoute.js";
import BloodCollectionRouter from "./Routes/BloodCollectionRoute.js";
import FCCollectionRouter from "./Routes/FCCollectionRoute.js";
import helpBotRouter from "./Routes/HelpBotRoute.js";

import { dbConnect } from "./Db/db.js";
import CreatePostRouter from "./Routes/CreatePostRoute.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

dbConnect();

app.use("/app/application", ApplicationRouter);
app.use("/app/blood", BloodCollectionRouter);
app.use("/app/fc-collection", FCCollectionRouter);
app.use("/app/posts", CreatePostRouter);
app.use("/app/helpbot", helpBotRouter);

app.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
