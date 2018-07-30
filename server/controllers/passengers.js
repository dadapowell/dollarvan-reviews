const Passenger = require('../models').Passenger;
const Review = require('../models').Review;

module.exports = {
    create(req, res) {
        return Passenger
            .create({
                phone: req.body.phone,
                username: req.body.username,
                email: req.body.email
            })
            .then(passenger => res.status(201).send(passenger))
            .catch(error => res.status(400).send(error));
    },
    
    list(req, res) {
        return Passenger
            .findAll({
                include: [{
                    model: Review,
                    as: 'Reviews',
                }],
            })
            .then(passengers => res.status(200).send(passengers))
            .catch(error => res.status(400).send(error));
    },
    
    update(req, res) {
        return Passenger
            .findById(req.params.id, {
                include: [{
                    model: Review,
                    as: 'Reviews',
                }],
            })
            .then(passenger => {
                if (!passenger){
                    return res.status(404).send({
                        message: "Passenger not found."
                    });
                }
                return passenger
                    .update({
                        username: req.body.username || passenger.username,
                        phone: req.body.phone || passenger.phone,
                        email: req.body.email || passenger.email,
                        fbid: req.body.fbid || passenger.fbid,
                        first_name: req.body.first_name || passenger.first_name,
                    })
                    .then(() => res.status(200).send(passenger))
                    .catch((error) => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    
    retrieve(req, res) {
        return Passenger
            .findById(req.params.id, {
                include: [{
                    model: Review,
                    as: 'Reviews',
                }],
            })
            .then(passenger => {
                if (!passenger){
                    return res.status(404).send({
                        message: "Passenger not found."
                    });
                }
                return res.status(200).send(passenger);
            })
            .catch(error => res.status(400).send(error));
    },
};