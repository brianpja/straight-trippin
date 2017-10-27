'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');

router.post('/comments', (req, res, next) => {
  console.log(req.body)
  knex('comments')
    .insert(req.body, '*')
    .then(function(comment) {
      console.log('responding with: ', comment)
      comment = comment[0];
      res.send(comment)
    })

    .catch((err) => {
      next(err);
    })
})




module.exports = router;
