const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router();

// router.post('/signup', userController.createUser, userController.createToken, (req, res) => {
//   res.status(200).json(res.locals.isLoggedIn);
// })

// router.post('/login', userController.verifyUser, userController.createToken, (req, res) => {
//   res.status(200).json(res.locals.isLoggedIn);
// })

router.get('/test', userController.createUser, (req, res)=> {
  res.status(200).send('Successful');
})


module.exports = router;