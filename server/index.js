require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 8080;
const { sequelize } = require("./models");

const user = require("./routes/user");
const myPage = require("./routes/myPage");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());

app.use("/", user);
app.use("/mypage", myPage);

//myPage, account, diary (logIn, logOut, signUp, withDrawal)

server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
