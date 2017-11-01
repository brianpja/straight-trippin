'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const cloudinary = require('cloudinary')

router.get('/posts', (req, res, next) => {

  return knex.schema.raw(
    `SELECT posts.id as post_id,
      posts.location as post_location,
      content,
      created_at,
      updated_at,
      first_name,
      last_name,
      img,
      year,
      user_id,
      (SELECT json_agg(styles)
        FROM (
          SELECT name
          FROM styles
          INNER JOIN posts_styles ON styles.id = posts_styles.style_id
          WHERE posts_styles.post_id = posts.id
        ) styles) as styles,
      (SELECT json_agg(comments)
        FROM (
          SELECT content,
          created_at,
          updated_at,
          first_name,
          last_name,
          img,
          comments.user_id as user_id
          FROM comments
          INNER JOIN users ON users.id = comments.user_id
          WHERE posts.id = comments.post_id
        ) comments) as comments,
      (SELECT json_agg(images)
        FROM (
          SELECT url
          FROM images
          WHERE posts.id = images.post_id
        )images) as images
    FROM posts
    INNER JOIN users ON posts.user_id = users.id`)

      .then(function(posts) {
        posts = posts.rows.map(function(post) {
          post.showComments = false;
          if (!post.comments) {
            post.comments = [];
          }
          if (!post.images) {
            post.images = [];
          }
          if (!post.styles) {
            post.styles = [];
          }
          return post
        })
        res.send(posts)
      })

      .catch((err) => {
        next(err);
      })
})

router.get('/users/:id/posts', (req, res, next) => {

  return knex.schema.raw(
    `SELECT posts.id as post_id,
      posts.location as post_location,
      content,
      created_at,
      updated_at,
      first_name,
      last_name,
      img,
      year,
      user_id,
      (SELECT json_agg(styles)
        FROM (
          SELECT name
          FROM styles
          INNER JOIN posts_styles ON styles.id = posts_styles.style_id
          WHERE posts_styles.post_id = posts.id
        ) styles) as styles,
      (SELECT json_agg(comments)
        FROM (
          SELECT content,
          created_at,
          updated_at,
          first_name,
          last_name,
          img,
          comments.user_id as user_id
          FROM comments
          INNER JOIN users ON users.id = comments.user_id
          WHERE posts.id = comments.post_id
        ) comments) as comments,
      (SELECT json_agg(images)
        FROM (
          SELECT url
          FROM images
          WHERE posts.id = images.post_id
        )images) as images
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    WHERE posts.user_id = ${req.params.id}`)

      .then(function(posts) {
        posts = posts.rows.map(function(post) {
          post.showComments = false;
          if (!post.comments) {
            post.comments = [];
          }
          if (!post.images) {
            post.images = [];
          }
          if (!post.styles) {
            post.styles = [];
          }
          return post
        })
        res.send(posts)
      })

      .catch((err) => {
        next(err);
      })
})




module.exports = router;
