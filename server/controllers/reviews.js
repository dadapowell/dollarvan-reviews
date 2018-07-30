const Review = require('../models').Review;

module.exports = {
    create(req, res) {
        return Review
            .create({
                star_rating: req.body.star_rating,
                short_review: req.body.short_review,
                long_review: req.body.long_review,
                passengerID: req.params.passengerID,
                vanID: req.params.vanID
            })
            .then(review => res.status(201).send(review))
            .catch(error => res.status(400).send(error));
    }
};