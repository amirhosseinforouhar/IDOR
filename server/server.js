const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const protectRoute = require("./middlewares/protect-route");

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", protectRoute, userRouter);

app.use(notFound);
app.use(errorHandler);

connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
