require('dotenv').config()
import jwt from 'jsonwebtoken'

const CreateJWT = () => {
    let payload = { name: 'Tamm', address: 'Ha Noi' }
    let key = process.env.JWT_SECRET
    let token = null
    try {
        token = jwt.sign(payload, key);
        console.log(token);
    } catch (e) {
        console.log(e);
    }
    console.log(token);
    return token
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let data = null
    try {
        let decoded = jwt.verify(token, key)
        data = decoded
    } catch (e) {
        console.log(e);
    }
    return data
}

module.exports = {
    CreateJWT, verifyToken
}