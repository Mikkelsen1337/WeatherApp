const express = require('express');
const router = express.Router();
const { addFavorite, getFavorites, deleteFavorites } = require ('../controllers/favoriteController');

router.post('/', addFavorite);
router.get('/', getFavorites);
router.delete('/:id', deleteFavorites);

module.exports = router;