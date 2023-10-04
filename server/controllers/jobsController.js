const db = require('../models/jobHunterModels')
const dotenv = require('dotenv');
dotenv.config();



const jobsController = {};
const formattedDate = () => {
  const currentTimestamp = Date.now()
  const currentDate = new Date(currentTimestamp)
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
} 

jobsController.getJobs = async (req, res, next) => {
  try{
    const username = 'nhat'

    const value = [username];
    const findJobs = 'SELECT * FROM "jobs" WHERE user_username = $1'
    const results = await db.query(findJobs, value);
    console.log('result row: ', results.rows);
    res.locals.jobs = results.rows
    return next();

  }catch(err){
    return next({
      log: `There was a problem in jobsController.getJobs. Error: ${err}`,
      status: 400,
      message: `There was a problem getting your jobs ${err}`
    })
  }
}

jobsController.addJobs = async (req, res, next) => {
  try{
    const username = 'nhat'
    const date = formattedDate();
    const { company, position, salary, location, description, followUp } = req.body;
    console.log(followUp);
    const value = [username, company, position, salary, location, date, description, followUp];
    const job = 'INSERT INTO jobs(user_username, company_name, position, salary, location, date_applied, description, follow_up) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    const results = await db.query(job, value);
    // console.log(results);

    return next();

  }catch(err){
    return next({
      log: `There was a problem in jobsController.addJobs. Error: ${err}`,
      status: 400,
      message: 'There was a problem adding your job'
    })
  }
}

jobsController.updateJob = async (req, res, next) => {
  try{
    const username = 'nhat'
    const { id, company, position, salary, location, description, followUp } = req.body;
    const value = [company, position, salary, location, description, followUp];
    const job = `UPDATE jobs SET company_name = $1, position = $2, salary = $3, location = $4, description = $5, follow_up = $6 WHERE _id = ${id}`
    const results = await db.query(job, value)
    console.log(results);
    return next();

  }catch(err){
    return next({
      log: `There was a problem in jobsController.updateJob. Error: ${err}`,
      status: 400,
      message: `There was a problem updating your job information ${err}`
    })
  }
}

jobsController.deleteJob = async (req, res, next) => {
  try{
    const username = 'nhat'
    const { id } = req.body;
    const deleteJob = `DELETE FROM jobs WHERE _id = ${id}`
    const results = await db.query(deleteJob)
    console.log(results);
    return next();

  }catch(err){
    return next({
      log: `There was a problem in jobsController.updateJob. Error: ${err}`,
      status: 400,
      message: `There was a problem updating your job information ${err}`
    })
  }
}


















module.exports = jobsController;