'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const cloudinary = require('cloudinary');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb){
    cb(null, Date.now()+ '-' + file.originalname)
  }
})
const upload = multer({storage});

cloudinary.config({
  cloud_name: 'hs8ytl7eb',
  api_key: '396935197223193',
  api_secret: 'K5yY4J2El92gV-rha-cTIvZ-I40'
});

router.post('/profile', upload.single('file'), (req, res, next) => {
  console.log('routing works')
  console.log(req.file);

  cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
    console.log('result: ', result)
    res.send(result);
  })
})

router.post('/images', upload.single('file'), (req, res, next) => {
  console.log(req.file);

  cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
    console.log('result: ', result)
    res.send(result);
  })
})




module.exports = router;
