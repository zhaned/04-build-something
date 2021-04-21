const { Router } = require('express');
const Pokemon = require('../model/Pokemon');

module.exports = Router()
  .get('/', (req, res, next) => {
    Pokemon.getAll()
      .then(pokemon => res.send(pokemon))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Pokemon.getById(req.params.id)
      .then(pokemon => res.send(pokemon))
      .catch(next);
  }) 
  .post('/', (req, res, next) => {
    Pokemon.insert(req.body)
      .then(pokemon => res.send(pokemon))
      .catch(next);
  }) 
  .put('/:id', (req, res, next) => {
    Pokemon.update(req.params.id, req.body.weight)
      .then(pokemon => res.send(pokemon))
      .catch(next);
  })
  .delete('/:id', async(req, res, next) => {
    Pokemon.delete(req.params.id)
      .then(pokemon => res.send(pokemon))
      .catch(next);
  }) 