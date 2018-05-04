const express = require('express');
const Car = require('../models/car');
const mongoose = require('mongoose');

function index(request, response, next) {
  const page = request.params.page ? request.params.page : 1;
  Car.paginate({}, {
    page: page,
    limit: 3
  }, (err, objs) => {
    if (err) {
      response.json({
        error: true,
        message: 'No se pudo extraer los carros.',
        objs: {}
      });
    } else {
      response.json({
        error: false,
        message: 'Lista de Carros',
        objs: objs
      });
    }
  });
}

function create(request, response, next) {
  console.log(request.body);
  const model = request.body.model;
  const description = request.body.description;
  const status = request.body.status;
  const color = request.body.color;

  let car = new Car();
  car.model = model;
  car.description = description;
  car.status = status;
  car.color = color;

  car.save((err, obj) => {
    if (err) {
      response.json({
        error: true,
        message: 'Carro no Guardado',
        objs: err
      });
    } else {
      response.json({
        error: false,
        message: 'Carro Guardado',
        objs: obj
      });
    }
  });
}

function update(request, response, next) {
  const model = request.body.model;
  const description = request.body.description;
  const status = request.body.status;
  const color = request.body.color;

  Car.findOne({
    _id: mongoose.Types.ObjectId(request.params.id)
  }, function (err, doc){
    doc.model = model;
    doc.description = description;
    doc.status = status;
    doc.color = color;
  doc.save((err, obj) => {
    if (err) {
      response.json({
        error: true,
        message: 'Carro no Actualizado',
        objs: err
      });
    } else {
      response.json({
        error: false,
        message: 'Carro Actualizado',
        objs: obj
      });
    }
  });;
});


}

function remove(request, response, next) {
  const id = request.params.id;
  if (id) {
    Car.remove({
      _id: id
    }, function(err) {
      if (err) {
        response.json({
          error: true,
          message: 'Carro No Eliminado',
          objs: {}
        });
      } else {
        response.json({
          error: false,
          message: 'Carro Eliminado',
          objs: {}
        });
      }
    });
  } else {
    response.json({
      error: true,
      message: 'Carro no Existe',
      objs: {}
    });
  }
}

module.exports = {
  index,
  create,
  update,
  remove
};
