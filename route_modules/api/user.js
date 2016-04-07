function user(Poll, req, res) {
     if(req.session.passport){
    var user = req.session.passport.user;
    
    Poll.find({"creator": user}).select('title').exec(function(err, results){
      if (err){
        console.log(err);
      }
      else {
        console.log(results);
        res.status(200).json(results);
      }
    })
    
  }
}

module.exports = user;