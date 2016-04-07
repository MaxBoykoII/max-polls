function deleteChart(Poll, req, res) {
    if (req.session.passport) {
        var user = req.session.passport.user,
            id = req.params.id;
            
        Poll.findById(id, function(err, doc) {
          
            if (err) {
                console.log(err);
                res.status(500).json({
                    error: "Something went wrong. Please try again!"
                });
            }
            else if (user === doc.creator) {
                console.log("It's a go!");
                Poll.remove({
                    "_id": id
                }, function(err) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: "Something went wrong. Please try again!"
                        });
                    }
                    else {
                        res.status(200).json({
                            status: "Success!"
                        });
                    }
                })
            }

        });
    }
}

module.exports = deleteChart;