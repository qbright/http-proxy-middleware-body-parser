const concatStream = require("concat-stream");

module.exports = function(options) {
  return function(req, res, next) {
    req.pipe(
      concat((data) => {
        const contentType = req.headers["content-type"];
        if (contentType && contentType.indexOf("application/json") !== -1) {
          req.bod = JSON.parse(data.toString());
        } else {
          req.body = data.toString();
        }
        req.rawBody = data;
        next();
      })
    );
  };
};