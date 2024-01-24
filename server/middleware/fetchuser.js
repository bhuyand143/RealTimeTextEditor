const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SIGN;
require('dotenv').config()
const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and id to req object
    const token = req.header('auth-token');//name of the header it can be any name which should be name as header
    if (!token) {
        res.status(401).json({ error: "Please Authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user
        next();     
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Internal Error!" })
    }
}

module.exports = fetchuser;