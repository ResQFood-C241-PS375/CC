const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.JWT_KEY, { expiresIn: "1day" });
}

const verifyToken = (req, res, next) => {
  const JWT_KEY = process.env.JWT_KEY;

    const header = req.headers
    const Istoken = header && header.authorization && header.authorization.split(' ')[0] == 'Bearer';
    const token = header.authorization.split(' ')[1]

    if (Istoken) {
        jwt.verify(token, JWT_KEY, (error, decoded) => {
            if (error) {
                res.status(403).json({
                    error: true,
                    message: error.message,
                })

            } else {
                // console.log(decoded);
                res.locals.jwt = decoded
                next();
            }
        })
    } else {
        res.status(400).json({
            error: true,
            message: 'Cari token dulu',
        })
    }
}



module.exports = { generateAccessToken, verifyToken };
