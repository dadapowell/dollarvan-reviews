const passengersController = require('../controllers').passengers;
const reviewsController = require('../controllers').reviews;
const vansController = require('../controllers').vans;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Passengers API',
    }));
    
    app.post('/api/passengers', passengersController.create);
    app.get('/api/passengers/:id', passengersController.retrieve);
    app.get('/api/passengers', passengersController.list);
    app.put('/api/passengers/:id', passengersController.update);
    
    app.post('/api/vans', vansController.create);
    app.get('/api/vans/:id', vansController.retrieve);
    app.get('/api/vans/dvid/:dollarvan_id', vansController.retrieveByDVID);
    app.put('/api/vans/:id', vansController.update);
    
    app.post('/api/reviews/:passengerID/:vanID', reviewsController.create);
    
};