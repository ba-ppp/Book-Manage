// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var userRouter = require("./routes/users.route");
var bookRouter = require("./routes/books.route");
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users',userRouter)
app.use('/books',bookRouter);
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
