const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/** function from handling a /GET request to /reservations */
async function list(request, response) {
  /** create variable for date so that the request will
   * only return all reservations for that specific date
   */
  const date = request.query.date; //> /reservations?date=yyyy-mm-dd
  const res = await service.list(date);
  response.json({
    data: res,
  });
}

function validateBody(request, response, next) {
  if (!request.body.data) {
    return next({ status: 400, message: "Body must include a data object" });
  }

  const requiredFields = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];

  for (const field of requiredFields) {
    if (
      !request.body.data.hasOwnProperty(field) ||
      request.body.data[field] === ""
    ) {
      return next({ status: 400, message: `Field required: '${field}'` });
    }
  }

  if (
    Number.isNaN(
      Date.parse(
        `${request.body.data.reservation_date} ${request.body.data.reservation_time}`
      )
    )
  ) {
    return next({
      status: 400,
      message:
        "'reservation_date' or 'reservation_time' field is in an incorrect format",
    });
  }

  if (typeof request.body.data.people !== "number") {
    return next({ status: 400, message: "'people' field must be a number" });
  }

  if (request.body.data.people < 1) {
    return next({ status: 400, message: "'people' field must be at least 1" });
  }

  next();
}
/** middleware function for validating the reservation_date */
function validateDate(request, response, next) {
  const reserveDate = new Date(
    `${request.body.data.reservation_date}T${request.body.data.reservation_time}:00.000`
  );
  const todaysDate = new Date();

  if (reserveDate.getDay() === 2) {
    return next({
      status: 400,
      message: "'reservation_date' field: restaurant is closed on tuesday",
    });
  }

  if (reserveDate < todaysDate) {
    return next({
      status: 400,
      message:
        "'reservation_date' and 'reservation_time' field must be in the future",
    });
  }

  if (
    reserveDate.getHours() < 10 ||
    (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)
  ) {
    return next({
      status: 400,
      message: "'reservation_time' field: restaurant is not open until 10:30AM",
    });
  }

  if (
    reserveDate.getHours() > 22 ||
    (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)
  ) {
    return next({
      status: 400,
      message: "'reservation_time' field: restaurant is closed after 10:30PM",
    });
  }

  if (
    reserveDate.getHours() > 21 ||
    (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)
  ) {
    return next({
      status: 400,
      message:
        "'reservation_time' field: reservation must be made at least an hour before closing (10:30PM)",
    });
  }

  next();
}

/**
 * function for handling /POST requests to /reservations
 * if all conditions are met
 */
async function create(request, response) {
  request.body.data.status = "booked";
  const response = await service.create(request.body.data);
  /** returns a status of 201 to indicate that the request was successful */
  response.status(201).json({
    /** returns [0] because the new reservation will be the
     * first in the reservations list */
    data: response[0],
  });
}

/** export list and create with their middleware functions
 * and asyncErrorBoundary included */
module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateBody, validateDate, asyncErrorBoundary(create)],
};
