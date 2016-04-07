function newPoll(Poll, req, res) {
    
    var labels = req.body.labels,
        data = labels.map(function(el) {
            return 0
        }),
        title = req.body.title,
        user = req.session.passport.user;

    Poll.create({
        "creator": user,
        "title": title,
        "labels": labels,
        "data": data,
        "user_votes": [],
        "ip_votes": []
    }, function(err, result) {

        if (err) {
            console.log(err);
            res.status(500).json({
                "error": "Something went wrong. Please try again."
            });
        }
        else {
            console.log(result);
            res.status(200).json({
                id: result.id
            });
        }
    });
}

module.exports = newPoll;