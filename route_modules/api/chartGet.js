function chart(Poll, req, res) {

    var id = req.params.id;
    Poll.find({
        "_id": id
    }).exec(function(err, results) {
        if (err) {
            console.log(err);
        }
        res.send(results[0]);

    });
}

module.exports = chart;