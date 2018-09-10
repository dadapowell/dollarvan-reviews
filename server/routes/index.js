const sessionsController = require('../controllers').sessions;
const passengersController = require('../controllers').passengers;
const reviewsController = require('../controllers').reviews;
const vansController = require('../controllers').vans;
const Passenger = require('../models').Passenger;


const session         = require('express-session');
const cookieParser         = require('express-session');

const db = require('../models/index');
console.log(Object.keys(db));

// Postgres DB setup
const pathToPostgresDb = process.env.NODE_ENV === 'production' ? process.env['DATABASE_URL'] : 'postgres://jasonlalor@localhost:5432/dollarvan-reviews-dev';


module.exports = (app) => {

    app.set('trust proxy', 1);
    // app.use(session({
    //     secret: '0c923a0b0e2f 66b1c4602d72',
    //     cookie: {
    //         secure: true,
    //         maxAge: 2592000000
    //     },
    //     resave: false,
    //     saveUninitialized: true,
    //     store: SessionStore
    // }));

    // app.post('/api/sendtoken', passengersController.findUserSendToken);

    app.post('/api/sessions', sessionsController.create);

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
