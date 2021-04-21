const pool = require('../utils/pool');

module.exports = class Fruit {
  id;
  name;
  color;
  taste;
  weight;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.taste = row.taste;
    this.weight = row.weight;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT *
      FROM fruits`
    );
    return rows.map((row) => new Fruit(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM fruits
      WHERE id=$1`,
      [id]
    );
    return new Fruit(rows[0]);
  }

  static async insert({ name, color, taste, weight }) {
    const { rows } = await pool.query(
      ` INSERT INTO fruits (name, color, taste, weight)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
      [name, color, taste, weight]
    );
    return new Fruit(rows[0]);
  }

  static async update(id, weight) {
    const { rows } = await pool.query(
      `UPDATE fruits
    SET weight = $1
    WHERE id = $2
    RETURNING *`,
      [weight, id]
    );
    return new Fruit(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      ` DELETE FROM fruits
    WHERE id = $1
    RETURNING *`,
      [id]
    );
    return new Fruit(rows[0]);
  }
};
