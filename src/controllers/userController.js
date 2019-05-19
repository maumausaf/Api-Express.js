const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post(
    '/register',    
    User.createUser
);

router.get('/', User.getUser);
router.get('/:id', User.getUserById);
router.put('/:id', User.updateUser);
router.delete('/:id',User.deleteUser);

module.exports = app => app.use('/user',router);