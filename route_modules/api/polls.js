function polls(Poll, req, res) {

    Poll.find().select('title id').exec(function(err, results) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    });

}

module.exports = polls;