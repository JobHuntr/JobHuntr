const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const userRouter = require('./routes/userRouter.js');




// Initialize Express
const app = express();
const PORT = 3000;

app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/user', userRouter)



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    //detailed message to dev
    log:
      ('Express error handler caught unknown middleware error. Error: ', err),
    status: 400,
    //basic message to user
    message: { err: `An error has occured ${err}` },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  //send error message to frontend
  return res.status(errorObj.status).json(errorObj.message);
});



// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
