const express = require('express');
const path = require('path');

// Initialize Express
const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded








// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
