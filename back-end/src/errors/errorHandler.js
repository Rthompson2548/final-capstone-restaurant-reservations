/** requiring middleware from utils folder */
const validateNameLength = require("./utils/validateNameLength");


/**
 * Express API error handler.
 */
function errorHandler(error, request, response, next) {
  /** 500:
   * Internal Server Error server error response code
   * indicates that the server encountered an unexpected
   * condition that prevented it from fulfilling the request
   * Usually, this indicates the server cannot find a better
   * 5xx error code to response
   */
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
}

app.post("/reservations",
validateDate,

)

/**
 * POST /reservations
 * 400: reservation is in the past (validateDate(foundErrors)
 * 400: reservation_date is on a tuesday (validateDate())
 * 400: reservation_time is not available (validateDate())
 */

module.exports = errorHandler;
