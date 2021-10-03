const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  const response = await service.list();
  response.json({ data: response });
}

function validateBody(request, response, next) {
  if (!request.body.data.table_name || !request.body.data.table_name === "") {
    return next({
      status: 400,
      message: "invalid table name: table name must be included",
    });
  }

  if (!request.body.capacity || request.body.data.capacity === "") {
    return next({
      status: 400,
      message: "invalid table capacity: table capacity must be included",
    });
  }

  if (request.body.data.table_name.length < 2) {
    return next({
      status: 400,
      message: "400 error: table name must be 2 or more characters long",
    });
  }

  if (request.body.data.capacity < 1) {
    return next({
      status: 400,
      message: "400 error: your capacity must be at least 1 person",
    });
  }

  if (typeof request.body.data.capacity !== "number") {
    return next({
      status: 400,
      message: "400 error: the capacity you entered is not a valid number",
    });
  }
  next();
}

async function create(request, response) {
  request.body.data.status = "free";
  const response = await service.create(request.body.data);
  response.status(201).json({ data: response[0] });
}
module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateBody, asyncErrorBoundary(create)],
};
