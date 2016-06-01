'use strict';

module.exports.toJSON = sendJSONresponse;

function sendJSONresponse(prop, status) {
  return function(req, res, next) {
    res.status(status || 200).json(req.resources[prop]);
  }
}
