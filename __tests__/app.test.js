const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Fruit = require('../lib/model/Fruit'); 

describe('09-build-something routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => pool.end());

  it('gets all the fruits', async () => {
    await Fruit.insert({ name: 'orange', color: 'orange', taste: 'sour', weight: 5}),
    await Fruit.insert({ name: 'apple', color: 'red', taste: 'sweet', weight: 4}),
    await Fruit.insert({ name: 'avocado', color: 'green', taste: 'nutty', weight: 5})

    const res = await request(app)
      .get('/api/v1/fruits')

      expect(res.body).toEqual([
        { id: '1', name: 'orange', color: 'orange', taste: 'sour', weight: 5},
        { id: '2',name: 'apple', color: 'red', taste: 'sweet', weight: 4},
        { id: '3',name: 'avocado', color: 'green', taste: 'nutty', weight: 5}
      ])
  });

  it('gets a fruit by id', async () => {
    await Fruit.insert({ name: 'orange', color: 'orange', taste: 'sour', weight: 5}),
    await Fruit.insert({ name: 'apple', color: 'red', taste: 'sweet', weight: 4}),
    await Fruit.insert({ name: 'avocado', color: 'green', taste: 'nutty', weight: 5})

    const res = await request(app)
      .get('/api/v1/fruits/2')

      expect(res.body).toEqual({ 
        id: '2',
        name: 'apple', 
        color: 'red', 
        taste: 'sweet', 
        weight: 4})
  });

  it('posts a fruit to the database', async () => {
    const fruit = {
      name: 'avocado', 
      color: 'green', 
      taste: 'nutty', 
      weight: 5
    }
    const res = await request(app)
      .post('/api/v1/fruits')
      .send(fruit);

      expect(res.body).toEqual(
        { id: '1',name: 'avocado', color: 'green', taste: 'nutty', weight: 5}
      )
  });

  it('updates a fruit by id', async () => {
    await Fruit.insert({ name: 'orange', color: 'orange', taste: 'sour', weight: 5}),
    await Fruit.insert({ name: 'apple', color: 'red', taste: 'sweet', weight: 4}),
    await Fruit.insert({ name: 'avocado', color: 'green', taste: 'nutty', weight: 5})

    const fruitUpdate = { 
      weight: 5
    }

    const res = await request(app)
      .put('/api/v1/fruits/2')
      .send(fruitUpdate);

      expect(res.body).toEqual({ 
        id: '2',
        name: 'apple', 
        color: 'red', 
        taste: 'sweet', 
        weight: 5})
  });
  
  it('deletes a fruit by id', async () => {
    await Fruit.insert({ name: 'orange', color: 'orange', taste: 'sour', weight: 5}),
    await Fruit.insert({ name: 'apple', color: 'red', taste: 'sweet', weight: 4}),
    await Fruit.insert({ name: 'avocado', color: 'green', taste: 'nutty', weight: 5})

    const res = await request(app)
      .delete('/api/v1/fruits/2')

      expect(res.body).toEqual({ 
        id: '2',
        name: 'apple', 
        color: 'red', 
        taste: 'sweet', 
        weight: 4})
  });

});
