/** function for:
 *  checking for request body data X
 *  checking for all required fields (make var for these fields) X
 *  checking is date is in actual date format
 *  checking if the "people" field is a number
 *  checking if "people" is >= 1 */
function validateBody(request, response, next) {
  if (!req.body.data) {
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
    if (!req.body.data.hasOwnProperty(field) || req.body.data[field] === "") {
      return next({ status: 400, message: `Field required: '${field}'` });
    }
  }

  if (
    Number.isNaN(
      Date.parse(
        `${req.body.data.reservation_date} ${req.body.data.reservation_time}`
      )
    )
  ) {
    return next({
      status: 400,
      message:
        "'reservation_date' or 'reservation_time' field is in an incorrect format",
    });
  }

  if (typeof req.body.data.people !== "number") {
    return next({ status: 400, message: "'people' field must be a number" });
  }

  if (req.body.data.people < 1) {
    return next({ status: 400, message: "'people' field must be at least 1" });
  }

  next();
}

/** middleware function for validating the reservation_date */
function validateDate(request, response, next) {
  const reserveDate = new Date(
    `${req.body.data.reservation_date}T${req.body.data.reservation_time}:00.000`
  );
  const todaysDate = new Date();

  if (reserveDate.getDay() === 2) {
    return next({
      status: 400,
      message: "'reservation_date' field: restauraunt is closed on tuesday",
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

/** GET /reservations
      returns only reservations matching date query parameters
      returns reservations sorted by time (early -> late)
 */

/** function from handling a /GET request to /reservations */
async function list(request, response) {
  /** create variable for date so that the request will
   * only return all reservations for that specific date
   */
  const date = request.query.date; //> /reservations?date=yyyy-mm-dd
  const response = await service.list(date);
  res.json({
    data: response,
  });
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
