const express = require('express');
const User = require('../models/user');
const async = require('async');
const jwt = require('jsonwebtoken');

function login(request, response, next) {
  const email = request.body.email;
  const password = request.body.password;
  async.parallel({
    user: (callback) => {
      User.findOne({
        user: email
      }).exec(callback);
    }
  }, (err, results) => {
    const user = results.user;
    if (user) {
        if (password === user.password) {
          const payload = {
            id: user._id
          };
          let token = jwt.sign(payload, '52d0380eb37d6d4666fddbd82daf5ee3',{
            expiresIn: 86400
          });
          response.json({
            error: false,
            message: 'Usuario y password ok',
            objs: {
              token : token
            }
          });
        } else {
          response.json({
            error: true,
            message: 'Usuario y password incorrectos',
            objs: {}
          });
        }
    } else {
      response.json({
        error: true,
        message: 'Usuario y password incorrectos',
        objs: {}
      });
    }
  });
}


module.exports = {
  login
};
