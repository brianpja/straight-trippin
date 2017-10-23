'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken')

router.get('/users', (req, res, next) => {
  knex('users')
    .then((users) =>{
      res.send(users)
    })
    .catch((err) => {
      next(err);
    })
})


module.exports = router;
