const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Pokemon = require('../lib/model/Pokemon'); 

describe('09-build-something routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => pool.end());

  it('gets all the pokemon', async () => {
    await Pokemon.insert({ name: 'pikachu', height: 16, type: 'electric', weight: 13});
    await Pokemon.insert({ name: 'typhlosion', height: 67, type: 'fire', weight: 175});
    await Pokemon.insert({ name: 'mewtwo', height: 79, type: 'psychic', weight: 269});

    const res = await request(app)
      .get('/api/v1/pokemons')

      expect(res.body).toEqual([
        { id: '1', name: 'pikachu', height: 16, type: 'electric', weight: 13},
        { id: '2', name: 'typhlosion', height: 67, type: 'fire', weight: 175},
        { id: '3', name: 'mewtwo', height: 79, type: 'psychic', weight: 269}
      ])
  });

  it('gets a Pokemon by id', async () => {
    await Pokemon.insert({ name: 'pikachu', height: 16, type: 'electric', weight: 13});
    await Pokemon.insert({ name: 'typhlosion', height: 67, type: 'fire', weight: 175});
    await Pokemon.insert({ name: 'mewtwo', height: 79, type: 'psychic', weight: 269});

    const res = await request(app)
      .get('/api/v1/pokemons/2')

      expect(res.body).toEqual({ 
        id: '2',
        name: 'typhlosion', 
        height: 67, 
        type: 'fire', 
        weight: 175
      })
  });

  it('posts a Pokemon to the database', async () => {
    const Pokemon = {
      name: 'mewtwo', 
      height: 79, 
      type: 'psychic', 
      weight: 269
    }
    const res = await request(app)
      .post('/api/v1/pokemons')
      .send(Pokemon);

      expect(res.body).toEqual(
        {    
          id: '1',   
          name: 'mewtwo', 
          height: 79, 
          type: 'psychic', 
          weight: 269
        }
      )
  });

  it('updates a Pokemon by id', async () => {
    await Pokemon.insert({ name: 'pikachu', height: 16, type: 'electric', weight: 13});
    await Pokemon.insert({ name: 'typhlosion', height: 67, type: 'fire', weight: 175});
    await Pokemon.insert({ name: 'mewtwo', height: 79, type: 'psychic', weight: 269});

    const PokemonUpdate = { 
      weight: 5,
    }

    const res = await request(app)
      .put('/api/v1/pokemons/2')
      .send(PokemonUpdate);

      expect(res.body).toEqual({ 
        id: '2',
        name: 'typhlosion', 
        height: 67, 
        type: 'fire', 
        weight: 5})
  });
  
  it('deletes a Pokemon by id', async () => {
      await Pokemon.insert({ name: 'pikachu', height: 16, type: 'electric', weight: 13});
      await Pokemon.insert({ name: 'typhlosion', height: 67, type: 'fire', weight: 175});
      await Pokemon.insert({ name: 'mewtwo', height: 79, type: 'psychic', weight: 269});

    const res = await request(app)
      .delete('/api/v1/pokemons/2')

      expect(res.body).toEqual({ 
        id: '2',
        name: 'typhlosion', 
        height: 67, 
        type: 'fire', 
        weight: 175})
  });

});