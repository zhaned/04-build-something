const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('04-build-something routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});
