const { constants } = require("../constants");
/* const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      console.log("No Error, All good !");
      break;
  }
}; */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode); // Ensure the response uses the correct status code

  let response = {
    title: "",
    message: err.message,
    stackTrace:
      process.env.NODE_ENV == "development" ? err.stack : "Stack trace hidden", // Hide stack trace in production
  };

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      response.title = "Validation Failed";
      break;
    case constants.NOT_FOUND:
      response.title = "Not Found";
      break;
    case constants.UNAUTHORIZED:
      response.title = "Unauthorized";
      break;
    case constants.FORBIDDEN:
      response.title = "Forbidden";
      break;
    case constants.SERVER_ERROR:
      response.title = "Server Error";
      break;
    default:
      response.title = "Error";
      response.message = "An unexpected error occurred";
      break;
  }

  res.json(response);
};

module.exports = errorHandler;
