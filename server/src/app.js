import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import globalRouter from "./router/globalRouter";
import routes from "./routes";
// import cors from "cors";
import "./utils/db";
const app = express();

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
// middleware
app.use(allowCrossDomain);
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use(routes.home, globalRouter);

// 404
app.get("*", (req, res) => {
  res.status(404).send("api not found");
});

export default app;
