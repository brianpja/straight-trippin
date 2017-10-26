'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');

router.get('/users', (req, res, next) => {
  knex('users')
    .then((users) =>{
      res.send(users)
    })
    .catch((err) => {
      next(err);
    })
})

router.get('/users/:id', (req, res, next) => {
  knex('users')
    .where('users.id', req.params.id)
    .first()
    .then(function(user) {
      delete user.hashed_password;
      res.send(user)
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/users', (req, res, next) => {

  const userData = req.body;
  createBirthdate(userData);

  bcrypt.hash(userData.password, 12)
    .then(function(hashed_password) {
      delete userData.password;
      userData.hashed_password = hashed_password;

      knex('users')
        .insert(userData, '*')
        .then(function(result) {
          result = result[0]

          const claim = { userId: result.id };
          const token = jwt.sign(claim, process.env.JWT_KEY, {
            expiresIn: '7 days'
          });

          res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
            secure: router.get('env') === 'production'
          });

          delete result.hashed_password;
          res.send(result)
        })
    })
})

function createBirthdate(obj) {
  let day = obj.day;
  let month = obj.month;
  let year = obj.year;

  if (day.length < 2) {
    day = '0' + day;
  }
  if (month.length < 2) {
    month = '0' + month;
  }
  obj.birthdate = `${year}-${month}-${day}`
  delete obj.day;
  delete obj.month;
  delete obj.year;
}


module.exports = router;
