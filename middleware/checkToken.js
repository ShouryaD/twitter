const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret_key'

let verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization
        // let decode = jwt.verify(token,JWT_SECRET)
        let decode = jwt.decode(token, JWT_SECRET)
        console.log(decode)
        req.userId = decode._id
        next()
    } catch (error) {
        return res.json({msg:'Token verification failed!', success:false})
    }
}

module.exports = verifyToken