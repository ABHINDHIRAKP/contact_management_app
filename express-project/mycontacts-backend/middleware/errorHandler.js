const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode? res.statusCode:500;
    switch(statusCode){
        case constants.VALIDATION_FAILED:
            res.json({
                title: "VALIDATION_FAILED",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORISED:
            res.json({
                title: "UNAUTHORISED_ACCESS",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "FORBIDDEN_ACCESS",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "NOT_FOUND",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            res.json({
                title: "INTERNAL_SERVER_ERROR",
                message: err.message,
                stackTrace: err.stack
            });
            break;
    }
};
module.exports = errorHandler;