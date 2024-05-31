const Router = require('express');
const router = new Router();
const userFlightController = require('../controllers/userFlightController');

// Маршруты для получения данных
router.get('/user/:userId/favorite', userFlightController.getUserFavorites);
router.get('/flight/:flightId/favorite', userFlightController.getFlightFavorites);

module.exports = router;
