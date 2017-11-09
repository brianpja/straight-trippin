const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

if (process.env.NODE_ENV !== 'production') {
  const reload = require('reload')
  require('dotenv').config();
}

const users = require('./routes/users.js');
const token = require('./routes/token.js');
const posts = require('./routes/posts.js');
const comments = require('./routes/comments.js');
const images = require('./routes/images.js');
const styles = require('./routes/styles.js');
const follows = require('./routes/follows.js');


app.use(images);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join('public')));
app.use(express.static(path.join('node_modules')));

app.use(users);
app.use(token);
app.use(posts);
app.use(comments);
app.use(styles);
app.use(follows);

app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')})
})
app.use((req, res) => {
  res.sendStatus(404);
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.output.statusCode).send(err);
})


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
