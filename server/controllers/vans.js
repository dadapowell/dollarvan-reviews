const Van = require('../models').Van;
const Review = require('../models').Review;

module.exports = {
    create(req, res) {
        return Van
            .create({
                base_lic_num: req.body.base_lic_num,
                affil_base_name: req.body.affil_base_name,
                driver_name: req.body.driver_name,
                licensee_num: req.body.licensee_num,
                dollarvan_id: req.body.dollarvan_id,
                dollarvan_id_inuse: req.body.dollarvan_id_inuse,
                dmv_lic_plate: req.body.dmv_lic_plate
            })
            .then(van => res.status(201).send(van))
            .catch(error => res.status(400).send(error));
    },
    
    retrieve(req, res) {
        return Van
            .findById(req.params.id, {
                include: [{
                    model: Review,
                    as: 'Reviews',
                }],
            })
            .then(van => {
                if (!van){
                    return res.status(404).send({
                        message: "Van not found.",
                        Reviews: []
                    });
                }
                return res.status(200).send(van);
            })
            .catch(error => res.status(400).send(error));
    },
    
    retrieveByDVID(req, res) {
        return Van
            .findOne({
                where: [{dollarvan_id: req.params.dollarvan_id, dollarvan_id_inuse: true}],
                include: [{
                    model: Review,
                    as: 'Reviews',
                }],
            })
            .then(van => {
                if (!van){
                    return res.status(404).send({
                        message: "Van not found.",
                        Reviews: []
                    });
                }
                return res.status(200).send(van);
            })
            .catch(error => res.status(400).send(error));
    },
    
    update(req, res) {
        return Van
            .findById(req.params.id, {
                include: [{
                    model: Review,
                    as: 'Reviews',
                }],
            })
            .then(van => {
                if (!van){
                    return res.status(404).send({
                        message: "Van not found."
                    });
                }
                return van
                    .update(req.body, { fields: Object.keys(req.body) })
                    .then(() => res.status(200).send(van))
                    .catch((error) => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};