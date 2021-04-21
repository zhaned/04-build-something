const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/fruits', require('./controller/fruit'));
app.use('/api/v1/pokemons', require('./controller/pokemon'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
