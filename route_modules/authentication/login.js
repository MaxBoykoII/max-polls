function login(passport, req, res) {
    
    passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      console.log(info);

      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });

  })(req, res);
}

module.exports = login;