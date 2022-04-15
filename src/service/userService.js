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

    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('Select * from user');
        return rows
    } catch(error) {
        console.log("check error", error);
    }
}

const deleteUser = async (id) => {
     const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
        return rows
    } catch(error) {
        console.log("check error", error);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('select * FROM user WHERE id=?', [id]);
        return rows
    } catch(error) {
        console.log("check error", error);
    }
}

const updateUserInfo = async (email, username, id) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?', [email,username,id]);
        return rows
    } catch(error) {
        console.log("check error", error);
    }

}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}