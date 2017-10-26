'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');

router.get('/posts', (req, res, next) => {
  knex('posts')
    .innerJoin('users', 'posts.user_id', 'users.id')
    .select('posts.id as post_id', 'posts.location as post_location', 'content', 'created_at', 'updated_at', 'first_name', 'last_name', 'small_img', 'year', 'user_id')
    .then((posts) =>{
      res.send(posts)
    })
    .catch((err) => {
      next(err);
    })
})




module.exports = router;
