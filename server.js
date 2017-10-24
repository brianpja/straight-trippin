const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const reload = require('reload')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const users = require('./routes/users.js');
const token = require('./routes/token.js');


app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join('public')));
app.use(express.static(path.join('node_modules')));

app.use(users);
app.use(token);


app.use((req, res) => {
  res.send('brian you messing up!')
})


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
