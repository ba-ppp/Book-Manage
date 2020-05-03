var shortid = require('shortid');

module.exports = function(req, res, next){
  if(!req.signedCookie.sessionId){
    res.cookie("sessionId", shortid.generate(), {
      signed: true
    })
    
  }
  
  next();
}