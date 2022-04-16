import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import db from '../models'

// create the connection, specify bluebird as Promise
const salt = bcrypt.genSaltSync(10)

const hashUserPassWord = (userPassword) => {
     let hashPassWord = bcrypt.hashSync(userPassword, salt)
     return hashPassWord
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassWord(password)

    try {
        await db.User.create({
            username,
            email,
            password: hashPass
        })

    } catch(error) {
        console.log("check error", error);
    }
}

const getUserList = async () => {

    // RelationsShip

    let newUser = await db.User.findOne({
        where: {
            id: 1
        },
        attributes: ["id", "username", "email"],
        include: 
        {
             model: db.Group,
             attributes: ["name", "description"],
        },
        raw: true,
        nest: true
    })
    console.log("Check user", newUser);

    // let rows = await db.Group.findOne({
    //     where: {
    //         id: 1
    //     },
    //     include: { model: db.Role},
    //     raw: true,
    //     nest: true
    // })
    // console.log("Check rows", rows);

    let r = await db.Role.findAll({
        include: {
            model: db.Group,
            where: {
                id: 1
            }
        },
        raw: true,
        nest: true
    })

    console.log("Check rows", r);

    let users = []

    users = await db.User.findAll()

    return users
}

const deleteUser = async (id) => {
    await db.User.destroy({
        where: {
            id,
        }
    })
}

const getUserById = async (id) => {

    let user = {}
    user = await db.User.findOne({
        where: {
            id
        }   
    })

    return user.get({ plain: true })
}

const updateUserInfo = async (email, username, id) => {
    await db.User.update(
        { 
            email,
            username,
        },
        {
            where: {
                id
            }
        }
     );
    }

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}