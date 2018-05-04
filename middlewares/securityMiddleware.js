const express = require('express');
const jwt = require('jsonwebtoken');

function verifyToken(req, response, next){
  const token = request.body.token || request.query.token || request.headers['x-access-token'];
  console.log(token);
  if(token){
    jwt.verify(token, '52d0380eb37d6d4666fddbd82daf5ee3', (err, decoded) => {
      if(err){
        response.json({
          error: true,
          message: 'Llave incorrecta',
          objs: err
        });
      }else{
        next();
      }
    });
  }else{
    response.json({
      error: true,
      message: 'Llave incorrecta 2',
      objs: {}
    });
  }
}

module.exports = {
  verifyToken
}
