const knex = require("../db/connection");
const table = "reservations";

/** inserts new reservation into reservations and returns all reservations */
function create(reservation) {
  return knex(table).insert(reservation).returning("*");
}

/** query the reservations data if a date was provided in the request */
function list(date) {
  if (date) {
    return knex(table).select("*").where({ reservation_date: date });
  } else {
    return knex(table).select("*");
  }
}
