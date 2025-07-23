const jwt = require("jsonwebtoken");
const config = require("../config");

exports.signToken = (payload) => jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
exports.verifyToken = (token) => jwt.verify(token, config.jwt.secret);
