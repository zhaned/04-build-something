const pool = require('../utils/pool');

module.exports = class Pokemon {
  id;
  name;
  height;
  type;
  weight;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.height = row.height;
    this.type = row.type;
    this.weight = row.weight;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT *
      FROM pokemons`
    );
    return rows.map((row) => new Pokemon(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM pokemons
      WHERE id=$1`,
      [id]
    );
    return new Pokemon(rows[0]);
  }

  static async insert({ name, height, type, weight }) {
    const { rows } = await pool.query(
      ` INSERT INTO pokemons (name, height, type, weight)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
      [name, height, type, weight]
    );
    return new Pokemon(rows[0]);
  }

  static async update(id, weight) {
    const { rows } = await pool.query(
      `UPDATE pokemons
    SET weight = $1
    WHERE id = $2
    RETURNING *`,
      [weight, id]
    );
    return new Pokemon(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      ` DELETE FROM pokemons
    WHERE id = $1
    RETURNING *`,
      [id]
    );
    return new Pokemon(rows[0]);
  }
};