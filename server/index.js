require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 8080;

const user = require("./routes/user");
const myPage = require("./routes/myPage");

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
// app.use("/mypage", myPage);

//myPage, account, diary (logIn, logOut, signUp, withDrawal)

server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
