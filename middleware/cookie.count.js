module.exports.cookie = (req, res, next) => {
  var count = 0;
  if(res.cookie('cookie',12345))
    {
      count++;
    }
  console.log(count);
}