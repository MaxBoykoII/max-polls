function status(req, res){
    
     if (req.isAuthenticated() && req.session.passport) {
    console.log(req.session.passport.user);
    res.json({
      status: true,
      user: req.session.passport.user
    });
  }
  else {
    res.json({
      status: false,
      user: null
    });
  }
    
}

module.exports = status;