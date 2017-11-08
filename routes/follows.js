'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');

router.post('/follows', (req, res, next) => {
  console.log('backend')
  console.log('req.body: ', req.body)
  knex('follows')
    .insert(req.body, '*')
    .then(function(follow) {
      follow = follow[0];
      res.send(follow);
    })
    .catch((err) => {
      next(err);
    })
})

router.get('/users/:id/follows', (req, res, next) => {
  knex('follows')
    .where('user_id', req.params.id)
    .then(function(result) {
      res.send(result);
    })
    .catch((err) => {
      next(err);
    })
})

router.delete('/follows/:id', (req, res, next) => {
  let retVal;
  knex('follows')
    .where('follows.id', req.params.id)
    .first()
    .then(function(follow) {
      console.log(follow);
      if (!follow) return next();
      retVal = follow;
      return knex('follows')
        .where('follows.id', req.params.id)
        .del()
    })
    .then(function() {
      res.send(retVal);
    })
    .catch((err) => {
      next(err);
    })
})


module.exports = router;
