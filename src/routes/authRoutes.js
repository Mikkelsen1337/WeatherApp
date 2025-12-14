const express = require("express");
const router = new express.Router();
const { register, login, logout, deleteAccount } = require("../controllers/authController");


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/delete', deleteAccount)

module.exports = router;