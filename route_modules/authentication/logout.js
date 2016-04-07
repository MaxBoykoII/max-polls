function logout (req, res){
     req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
}

module.exports = logout;