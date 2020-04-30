// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var db = require('./db');
var shortid = require('shortid');
var bodyParser = require("body-parser");
var userRouter = require("./routes/users.route");
var bookRouter = require("./routes/books.route");
var tranRouter = require('./routes/transactions.route');


app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users',userRouter)
app.use('/books',bookRouter);
app.use('/transactions',tranRouter);

app.get('/transactions/:id/complete', (req, res) =>{
  var id = req.params.id;
  var trans = db.get('trans').find({id: id}).value();
  if(trans.isComplete === true)
    res.send('Done');
  else
    res.send('Not Yet');
})


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
