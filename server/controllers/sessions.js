const Passenger = require('../models').Passenger;
const Session = require('../models').Session;

module.exports = {
    create(req, res) {
        return Passenger
            .findOne({
                where: [{email: req.body.email}],
                as: 'Passenger'
            })
            .then(passenger => {
                if (!passenger) {
                    // Create a Passenger
                    if (req.body.phone) {
                        return Passenger
                            .create({
                                phone: req.body.phone
                            })
                            .then(() => res.status(200).send({message:"Success"}))
                            .catch(error => res.status(400).send(error))
                    } else {
                        return Passenger
                            .create({
                                email: req.body.email
                            })
                            .then(() => res.status(200).send({message:"Success"}))
                            .catch(error => res.status(400).send(error))
                    }

                } else if (!passenger.sessionID) {
                    // Create a Session and associate it with a Passenger
                    return Session
                        .create({
                            sess: { 'passengerID': passenger.id }
                        })
                        .then(session => {
                            return passenger
                                .update({
                                    sessionID: session.id
                                })
                                .then(() => {
                                    res.status(200).send({ 'sessionID': session.id });
                                })
                                .catch((error) => res.status(400).send(error));
                        })
                        .catch((error) => res.status(400).send(error));
                } else {
                    res.status(200).send({ 'sessionID': passenger.sessionID});
                }
            })
            .catch(error => res.status(400).send(error));
    },
};
