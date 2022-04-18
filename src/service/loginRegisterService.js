import db from '../models/index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)

const hashUserPassWord = (userPassword) => {
     let hashPassWord = bcrypt.hashSync(userPassword, salt)
     return hashPassWord
}

const checkEmail = async (email) => {
    let isExist = await db.User.findOne({
        where: {
            email
        }
    })
    if(isExist) {
        return true
    }
    return false
}

const checkPhone = async (phone) => {
    let isExist = await db.User.findOne({
        where: {
            phone
        }
    })
    if(isExist) {
        return true
    }
    return false
}

const registerNewUser = async (rawUserData) => {

    try {
    //check email/phonenumber are exist
    let isEmailExist = await checkEmail(rawUserData.email)
    if (isEmailExist === true) {
        return {
            EM: "The email is already exist",
            EC: 1,
            ET: 1
        }
    }
    let isPhoneExist = await checkPhone(rawUserData.phone)
    if (isPhoneExist === true) {
        return {
            EM: "The phone is already exist",
            EC: 1,
            ET: 2
        }
    }
    //hash user password
    let hashPassWord = hashUserPassWord(rawUserData.password)
    //create new user
    await db.User.create({
        email: rawUserData.email,
        password: hashPassWord,
        phone: rawUserData.phone,
        username: rawUserData.username
    })

    return {
        EM: "A user is created successfully!",
        EC: 0
    }

    } catch (e) {
        return {
            EM: "Somthing wrongs in service",
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser
}