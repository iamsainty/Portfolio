const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const userdetails = (req, res, next) => {
    //get token from header
    const token = req.header('token')
    if (!token) return res.status(401).send({ auth: false, message: 'No Token Provided' })
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).send({ auth: false, message: 'Failed to authenticate token.' })
    }
}
module.exports = userdetails;
