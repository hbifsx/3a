// routes/favorites.js
const express = require('express');
const router = express.Router();
const FavoriteController = require('../controllers/favoriteController');

router.get('/', FavoriteController.getFavorites);
router.post('/', FavoriteController.addFavorite);
router.put('/:id', FavoriteController.updateFavorite);

module.exports = router;