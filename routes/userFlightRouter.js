const Router = require('express');
const router = new Router();
const userFlightController = require('../controllers/userFlightController');

// Маршруты для получения данных
router.get('/user/:userId/favorites', userFlightController.getUserFavorites);
router.get('/flight/:flightId/favorites', userFlightController.getFlightFavorites);

module.exports = router;
