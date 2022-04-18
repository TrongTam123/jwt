import db from '../models/index'
import bcrypt from 'bcryptjs'
import { Op } from "sequelize";

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
        console.log(e);
        return {
            EM: "Somthing wrongs in service",
            EC: -2
        }
    }
}

const checkPassword = (password, hashPassWord) => {
    return bcrypt.compareSync(password, hashPassWord)
}

const handleLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })

        if(user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if(isCorrectPassword === true) {
                return {
                    EM: "ok!",
                    EC: 0,
                    DT: '',
                }
            }
        } 
        return {
            EM: "Your email address/phone number is incorrect",
            EC: 1,
            DT: '',
        }


    } catch (e) {
        console.log(e);
        return {
            EM: "Somthing wrongs in service",
            EC: 1,
            DT: '',
        }
    }
}

module.exports = {
    registerNewUser, handleLogin
}