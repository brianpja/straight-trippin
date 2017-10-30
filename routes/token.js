'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');

router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.send(false);
    }
    res.send({loggedIn: true, id: payload.userId});
  });
});

router.post(`/token`, (req, res, next) => {
  let user;
  const login = req.body;

  knex('users')
    .where('email', login.email)
    .first()
    .then(function(row) {
      if(!row) {
        throw boom.create(400, 'Bad email or password')
      }
      user = row;
      return bcrypt.compare(login.password, user.hashed_password)
    })

    .then(function() {

      const claim = { userId: user.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
        secure: router.get('env') === 'production'
      });

      delete user.hashed_password;
      res.send(user);
    })

    .catch(bcrypt.MISMATCH_ERROR, function() {
      throw boom.create(400, 'Bad email or password')
    })

    .catch((err) => {
      next(err);
    })
})

router.delete(`/token`, (req, res, next) => {
  res.clearCookie('token');
  res.send( {loggedIn: false} );
})

module.exports = router;
