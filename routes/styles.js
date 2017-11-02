'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');

router.get('/styles', (req, res, next) => {
  knex('styles')
    .then(function(styles) {
      res.send(styles);
    })
    .catch((err) =>{
      next(err);
    })
})




module.exports = router;
