const express = require('express')
const userController = require('../controllers/userController.js')

const router = express.Router();


router.post('/signup', userController.createUser, userController.createToken, (req, res) => {
  res.status(200).send(true);
})

router.post('/login', userController.verifyToken, userController.verifyUser, userController.createToken, (req, res) => {
  res.status(200).send(true);
})





module.exports = router;