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
          comments.user_id as user_id,
          comments.id as comment_id,
          comments.post_id as post_id
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
          post.comments = post.comments.map(function(comment) {
            comment.showDelete = false;
            return comment;
          })
          if (!post.images) {
            post.images = [];
          }
          if (!post.styles) {
            post.styles = [];
          }
          post.imagePointer = 0;
          post.imageCounter = 1;
          post.showDelete = false;
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
          comments.user_id as user_id,
          comments.id as comment_id,
          comments.post_id as post_id
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
          post.comments = post.comments.map(function(comment) {
            comment.showDelete = false;
            return comment;
          })
          if (!post.images) {
            post.images = [];
          }
          if (!post.styles) {
            post.styles = [];
          }
          post.imagePointer = 0;
          post.imageCounter = 1;
          post.showDelete = false;
          return post
        })
        res.send(posts)
      })

      .catch((err) => {
        next(err);
      })
})

router.post('/posts', (req, res, next) => {
  const postObj = {
    user_id: req.body.user_id,
    location: req.body.location,
    content: req.body.content
  }

  knex('posts')
    .insert(postObj, '*')
    .then(function(post) {
      post = post[0];

      if (!req.body.styles) {
        req.body.styles = [];
      }
      const stylesArr = req.body.styles.map(function(obj) {
        return obj = {
          post_id: post.id,
          style_id: obj.id
        }
      })

      return knex('posts_styles')
        .insert(stylesArr, '*')
        .then(function(styles) {

          if (!req.body.images) {
            req.body.images = [];
          }
            const imagesArr = req.body.images.map(function(str) {
              const obj = {
                post_id: post.id,
                url: str
              }
              return obj;
            })
            return knex('images')
            .insert(imagesArr, '*')
            .then(function(images) {
              res.send(post);
            })
        })

    })

    .catch((err) => {
      next(err);
    })
})

router.delete('/posts/:id', (req, res, next) => {
  let retVal;
  knex('posts')
    .where('posts.id', req.params.id)
    .first()
    .then(function(post) {
      if (!post) return next();
      retVal = post;
      return knex('posts')
        .where('posts.id', req.params.id)
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
