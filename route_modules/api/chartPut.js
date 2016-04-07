function handleVote(Poll, req, res) {
    var id = req.params.id,
        ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        user = req.session.passport ? req.session.passport.user : false;

    Poll.find({
        "_id": id
    }).exec(function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: "Something went wrong. Please try again."
            });
        }
        else {
            var ip_votes = results[0].ip_votes,
                user_votes = user && results[0].user_votes;
            var voted = user_votes ? !(ip_votes.indexOf(ip) === -1 && user_votes.indexOf(user) === -1) : !(ip_votes.indexOf(ip) === -1);
            if (voted) {
                res.status(400).json({
                    error: "You have already voted!"
                });
            }
            else if (req.body.exists) {
                var data = results[0].data,
                    index = results[0].labels.indexOf(req.body.option);
                data[index]++;
                console.log(data);



                Poll.findByIdAndUpdate(id, {
                        "$set": {
                            "data": data
                        },
                        "$push": {
                            "ip_votes": ip,
                            "user_votes": user
                        }
                    }, {
                        safe: true,
                        upsert: true,
                        new: true
                    },
                    function(err, result) {
                        if (err) {
                            console.log(err);
                        }
                        console.log(result);
                        res.status(200).json(result);

                    });

            }
            else if (user !== false) {
                Poll.findByIdAndUpdate(id, {
                        "$push": {
                            "ip_votes": ip,
                            "user_votes": user,
                            "labels": req.body.option,
                            "data": 1
                        }
                    }, {
                        safe: true,
                        upsert: true,
                        new: true
                    },
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                error: "Something went wrong. Please try again."
                            });
                        }
                        else {
                            console.log(result);
                            res.status(200).json(result);
                        }

                    });

            }
            else {
                res.status(401).json({
                    error: "Please login!"
                });
            }
        }
    });

}

module.exports = handleVote;