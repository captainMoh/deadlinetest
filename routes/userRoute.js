const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authControlleur = require('../controllers/authControlleur');
const authJwt = require('../middleware/jwt');

router.post('/signup', authControlleur.signUp);
router.post('/login', authControlleur.login);

// router.get('/', userController.getAllUsers);
router.get('/:id', authJwt, userController.getOneUser);
router.put('/:id', authJwt, userController.modifUser);
router.delete('/:id', authJwt, userController.deleteUser);

module.exports = router;