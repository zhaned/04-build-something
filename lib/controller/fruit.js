const { Router } = require('express');
const Fruit = require('../model/Fruit');

module.exports = Router()
  .get('/', (req, res, next) => {
    Fruit.getAll()
      .then(fruit => res.send(fruit))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Fruit.getById(req.params.id)
      .then(fruit => res.send(fruit))
      .catch(next);
  }) 
  .post('/', (req, res, next) => {
    Fruit.insert(req.body)
      .then(fruit => res.send(fruit))
      .catch(next);
  }) 
  .put('/:id', (req, res, next) => {
    Fruit.update(req.params.id, req.body.weight)
      .then(fruit => res.send(fruit))
      .catch(next);
  })
  .delete('/:id', async(req, res, next) => {
    Fruit.delete(req.params.id)
      .then(fruit => res.send(fruit))
      .catch(next);
  }) 
