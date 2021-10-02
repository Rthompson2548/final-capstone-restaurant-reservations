const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/** function from handling a /GET req to /reservations */
async function list(req, res) {
  /** create variable for date so that the req will
   * only return all reservations for that specific date
   */
  const date = req.query.date; //> /reservations?date=yyyy-mm-dd
  const response = await service.list(date);
  res.json({ data: response });
}

async function validateBody(req, res, next) {
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
      return next({
        status: 400,
        message: `invalid reservation: ${field} is missing`,
      });
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
        "invalid day and/or time: reservation date and/or time are not formatted correctly. please format time to 'HH:MM', and date to 'YYYY-MM-DD'",
    });
  }

  if (typeof req.body.data.people !== "number") {
    return next({
      status: 400,
      message: "error: reservation party size must be a number",
    });
  }

  if (req.body.data.people < 1) {
    return next({
      status: 400,
      message: "error: reservation party must include at least 1 person",
    });
  }

  if (req.body.data.status && req.body.data.status !== "booked") {
    return next({
      status: 400,
      message: `invalid status: reservation status cannot be ${req.body.data.status}`,
    });
  }

  next();
}
/** middleware function for validating the reservation_date */
async function validateDate(req, res, next) {
  const reserveDate = new Date(
    `${req.body.data.reservation_date}T${req.body.data.reservation_time}:00.000`
  );
  const todaysDate = new Date();

  if (reserveDate.getDay() === 2) {
    return next({
      status: 400,
      message: "invalid date: cannot make reservation on a tuesday",
    });
  }

  if (reserveDate < todaysDate) {
    return next({
      status: 400,
      message: "invalid date: only reservations for future dates can be made",
    });
  }

  if (
    reserveDate.getHours() < 10 ||
    (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)
  ) {
    return next({
      status: 400,
      message:
        "invalid time: reservation time cannot be before restaurant opens",
    });
  }

  if (
    reserveDate.getHours() > 22 ||
    (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)
  ) {
    return next({
      status: 400,
      message: "invalid time: reservation time cannot be after 10:30PM",
    });
  }

  if (
    reserveDate.getHours() > 21 ||
    (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)
  ) {
    return next({
      status: 400,
      message:
        "invalid time: can only make reservation time at least one hour before restaurant closes",
    });
  }

  next();
}

/**
 * function for handling /POST reqs to /reservations
 * if all conditions are met
 */
async function create(req, res) {
  /** sets default reservation status to `booked` */
  req.body.data.status = "booked";
  const response = await service.create(req.body.data);
  /** using response[0] so only the newly created reservation object is displayed */
  res.status(201).json({
    data: response[0],
  });
}

/** export list and create with their middleware functions
 * and asyncErrorBoundary included */
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(validateData),
    asyncErrorBoundary(validateBody),
    asyncErrorBoundary(validateDate),
    asyncErrorBoundary(create),
  ],
};
