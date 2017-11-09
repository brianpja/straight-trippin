'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');

router.post('/comments', (req, res, next) => {
  knex('comments')
    .insert(req.body, '*')
    .then(function(comment) {
      comment = comment[0];
      comment.comment_id = comment.id;
      res.send(comment)
    })

    .catch((err) => {
      next(err);
    })
})

router.delete('/comments/:id', (req, res, next) => {
  console.log(req.params);
  let retVal;
  knex('comments')
    .where('comments.id', req.params.id)
    .first()
    .then(function(comment) {
      if (!comment) return next();
      retVal = comment;
      return knex('comments')
        .where('comments.id', req.params.id)
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
