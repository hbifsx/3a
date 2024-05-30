// routes/flightNumbers.js
const express = require('express');
const router = express.Router();
const FlightNumberController = require('../controllers/flightnumberController');

router.get('/', FlightNumberController.getAllFlightNumbers);
router.post('/', FlightNumberController.createFlightNumber);
router.put('/:id', FlightNumberController.updateFlightNumber);

module.exports = router;