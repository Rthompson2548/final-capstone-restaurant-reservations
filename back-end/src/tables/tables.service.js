const knex = require("../db/connection");
const tableName = "tables";

function create(table) {
  return knex(table).insert(table).returning("*");
}

function list() {
  return knex(table).select("*");
}

module.exports = {
  list,
  create,
};
