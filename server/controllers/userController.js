const db = require('../models/jobHunterModels')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();



const userController = {};

userController.createUser = async (req, res, next) => {
  console.log('in createUser');
  try{
    const { username, password } = req.body;
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if(err){
        console.log(err);
        return next(err);
      }
      try{
        const person = 'INSERT INTO users(username, password) VALUES ($1, $2)'
        const values = [username, hashedPassword];
        const result = await db.query(person, values)
        res.locals.username = username
        return next();
      }catch(err){
        console.log(`Error in UserController.createUser - .hash function, Error: ${err}`);
        return next(err);
      }
    })
  }catch(err) {
    console.log(`Error in UserController.createUser, Error: ${err}`);
    return next(err);
  } 
}



userController.verifyUser = async (req, res, next) => {
  console.log('in verifyUser');
  try{
    if(res.locals.isLoggedIn === true){
      return next();
    }
    const values = [req.body.username];
    const { password } = req.body;
    const findUser = 'SELECT * FROM "users" WHERE username = $1';
    const results = await db.query(findUser, values);
    console.log('results: ', results);
    // console.log('results' , results.rows[0].password);
    let hashedPassword
    if (!results.rows[0]) {
      hashedPassword = '';
    } else {
      hashedPassword = results.rows[0].password
    }
    try {
       const match = await bcrypt.compare(password, hashedPassword);
       if(!match){
        console.log('There is no match');
        return next({
          log: 'Failed to log in, not match in bcrypt.compare',
          status: 400,
          message: {err: 'Failed to login'},
        });
       }
      res.locals.username = req.body.username;
      return next();
    } catch (err ){
      return next(err)
    }
  }catch(err){
    console.log(err);
    return next(err);
  }
}




userController.createToken = async (req, res, next) => {
  console.log('in createToken');
  try{
    if(res.locals.isLoggedIn === true){
      return next();
    }
    const values = [res.locals.username]
    console.log('username from value: ', values);
    const findUser = 'SELECT username FROM "users" WHERE username = $1'
    console.log('findUser: ', findUser);
    const result = await db.query(findUser, values)
    console.log('results', result.rows[0].username);
    const token = await jwt.sign({username: result.rows[0].username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60 * 60})
    await res.cookie('token', token, {
      maxAge: (60 * 60 * 1000),
      httpOnly: true
    })
    return next()
  } catch(err){
    return next(err);
  }
}

userController.verifyToken = async (req, res, next) => {
console.log('in verifyToken');
try{
  res.locals.isLoggedIn = false;
  // const token = req.cookies.token;
  const token = 'wrong';
  console.log('token:', token);

  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, success) => {
    if(err){
      console.log('Token did not match the ACCESS_TOKEN_SECRET');
      res.locals.isLoggedIn = false;
      }else{
      console.log('Token matches ACCES_TOKEN_SECRET');
      res.locals.isLoggedIn = true;
      // return res.redirect('/returnHome');
      }})
      return next();
}catch(err){
  return next({
    log: `catch in userController.verifyToken. Error: ${err}`,
    status: 400,
    message: 'cannot verify user'
  })
}
}












module.exports = userController;