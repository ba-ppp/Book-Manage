var db = require('../db');
var shortid = require('shortid');

module.exports.index = (req, res) => {
  
  res.render('transactions/',{
    trans: db.get('trans').value(),
    users: db.get('users').value(),
    books: db.get('books').value()
  });
};

module.exports.create = (req, res) => {
  res.render('transactions/create',{
    users: db.get('users').value(),
    books: db.get('books').value()
  })
}

module.exports.createPost = (req, res) => {
  var user = req.body.userName;
  var book = req.body.bookName;
  var userId = db.get('users').find({name: user}).value().id;
  var bookId = db.get('books').find({title: book}).value().id;
  var rs = {};
  rs.userId = userId;
  rs.bookId = bookId;
  rs.id = shortid.generate();
  db.get('trans').push(rs).write();
  res.redirect('/transactions')
}

module.exports.complete = (req, res) => {
  var id = req.params.id
  var trans = db.get('trans').find({id: id}).value()
  if(!trans){
    res.redirect('/transactions')
    return;
  }
  if(trans.isComplete === true)
    res.send('Done');
  else
    res.send('Not Yet');
}