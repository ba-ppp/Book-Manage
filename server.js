// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var userRouter = require("./routes/users.route");
var bookRouter = require("./routes/books.route");
var tranRouter = require("./routes/transactions.route");
var authRouter = require("./routes/auth.route");
var authLogin = require("./middleware/auth.validate");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(cookieParser(process.env.SECRET_COOKIE));

app.use("/users", authLogin.authLogin, userRouter);
app.use("/books", authLogin.authLogin, bookRouter);
app.use("/transactions", authLogin.authLogin, tranRouter);
app.use("/auth", authRouter);

app.get("/", authLogin.authLogin, (req, res) => {
  res.render("index", {
    id: req.cookies.userId
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


