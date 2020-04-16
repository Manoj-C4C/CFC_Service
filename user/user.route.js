const express = require("express");

var router = express.Router();

const userController = require('./user.controller');

router.post('/signup', function(req, res, next) {
    console.log('requset ...');
    userController.addUser(req, res, next);
});
router.get('/getusers', userController.getUsers);
router.delete('/:userId', userController.deleteUser);

module.exports = router;