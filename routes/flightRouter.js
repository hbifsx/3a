const express = require('express');
const router = express.Router();
const FlightController = require('../controllers/flightController');

router.get('/', FlightController.getAllFlights);
router.post('/', FlightController.createFlight);
router.get('/:id', FlightController.getFlightById);
router.put('/:id', FlightController.updateFlight);
router.delete('/:id', FlightController.deleteFlight);

module.exports = router;