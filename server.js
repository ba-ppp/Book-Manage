// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var shortid = require("shortid");
var bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults
db.defaults({ books: [], users: []}).write();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
// https://expressjs.com/en/starter/basic-routing.html
app.get("/books", (request, response) => {
  response.render("index", {
    books: db.get("books").value()
  });
});
app.get("/books/update/:id", (req, res) => {
    var id = req.params.id;
    var rs = db.get('books').find({id : id}).value();
    res.render('update',{
        book: rs
    });
});

app.get('/books/delete/:id', (req, res) => {
  var id = req.params.id;
  var rs = db.get('books').remove({id: id}).write();
  res.redirect('/books');
});


app.get('/users', (req, res) => {
  res.render('users',{
    users: db.get('users').value()
  });
});

app.get('/users/edit/:id', (req,res) => {
  var id = req.params.id;
  res.render('edit',{
    id: id
  })
})

app.get('/users/delete/:id', (req, res) => {
  var id = req.params.id;
  db.get('users').remove({id: id}).write();
  res.redirect('/users');
})

app.post('/users/edit/:id', (req, res) => {
  var name = req.body.name;
  var id = req.params.id;
  db.get('users').find({id: id}).assign({name: name}).write();
  res.redirect('/users');
})

app.post('/users/create', (req, res) => {
  var user = req.body;
  user.id = shortid.generate();
  db.get('users').push(user).write();
  res.redirect('/users');
})


app.post("/books/add", (req, res) => {
  var book = req.body;
  book.id = shortid.generate();
  db.get("books").push(book).write();
  res.redirect('/books');
});


app.post("/books/update/:id", (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    var rs = db.get('books').find({id : id}).assign({title: title}).write();
    res.redirect('/books');

});
  

  
  


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
