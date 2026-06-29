require('dotenv').config();

console.log(process.env.MONGO_URL);

const express = require("express");
const userRouter = require("./routes/user.router");
const indexRouter = require("./routes/index.router");
const connectToDB = require('./config/db');
const cookieParser = require("cookie-parser");
const fileRoutes = require("./routes/files");
connectToDB();

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/", indexRouter);
app.use(cookieParser())



app.use("/files", fileRoutes);



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
