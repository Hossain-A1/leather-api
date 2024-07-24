require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '30m' };

  const token = jwt.sign({id}, secret, options);
  return token;
};

const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (err.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    return null;
  }
};


module.exports = {
  createToken,
  verifyToken
};