const express = require('express')
const jobsController = require('../controllers/jobsController.js')

const router = express.Router();


router.get('/list', jobsController.getJobs, (req, res) => {
  res.status(200).json(res.locals.jobs);
})

router.post('/add', jobsController.addJobs, (req, res) => {
  res.status(200).send('Successfully added');
})

router.patch('/update', jobsController.updateJob, (req, res) => {
  res.status(200).json(res.locals.updated);
})

router.delete('/delete', jobsController.deleteJob, (req, res) => {
  res.status(200).send('Successfully Removed');
})






module.exports = router;