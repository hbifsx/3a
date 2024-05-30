const Router = require('express');
const router = new Router();
const favoriteRouter = require('./favoriteRouter');
const userRouter = require('./userRouter');
const flightRouter = require('./flightRouter');
const flightnumberRouter = require('./flightnumberRouter');
const userFlightRouter = require('./userFlightRouter');

router.use('/user', userRouter);
router.use('/flight', flightRouter);
router.use('/flightnumber', flightnumberRouter);
router.use('/favorite', favoriteRouter);
router.use('/userflight', userFlightRouter);

module.exports = router;
