import db from '../models/index'
import { checkEmail, checkPhone, hashUserPassWord } from './loginRegisterService'

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email","phone", "sex"],
            include: 
            {
                model: db.Group,
                attributes: ["name", "description"],
            },
            raw: true,
            nest: true
        })
        if(users) {
            // let data = users.get({ plain: true })
            return {
                EM: 'Get Data Success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'Get Data Falied',
                EC: -1,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit

        const { count, rows } = await db.User.findAndCountAll({
            attributes: ["id", "username", "email","phone", "sex", "address"],
            include: {
                model: db.Group,
                attributes: ["name", "description", "id"],
            },
            order: [['id', 'DESC']],
            offset,
            limit
        })

        let toltolPage = Math.ceil(count/limit)

        let data = {
            totalRows: count,
            toltolPage,
            users: rows
        }
        return {
                EM: 'Fetch OK',
                EC: 0,
                DT: data
            }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const CreateUser = async (data) => {
    try {
        //check email, phone
        let isEmailExist = await checkEmail(data.email)
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist",
                EC: 1,
                DT: "email"
            }
        }
        let isPhoneExist = await checkPhone(data.phone)
        if (isPhoneExist === true) {
            return {
                EM: "The phone is already exist",
                EC: 1,
                DT: "phone"
            }
        }
        //hash user password
        let hashPassWord = hashUserPassWord(data.password)
        await db.User.create({...data, password: hashPassWord})
        return {
                EM: 'Create User Success',
                EC: 0,
                DT: []
            }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const UpdateUser = async (data) => {
    try {
        if(!data.groupId) {
            return {
                EM: 'Update Error with groupId empty',
                EC: 1,
                DT: 'group'
            }
        }
        let user = await db.User.findOne({
            where: {
                id: data.id
            }
        })
        if (user) {
         await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: 'Update User Success',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'User not found',
                EC: 1,
                DT: ''
            }
        }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const deleteUser = async (id) => {
    try {
        let users = await db.User.findOne({
            where: { 
                id: id 
            }
        })

        if (users) {
            await users.destroy();
            return {
                EM: 'Delete User Success',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'User not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

module.exports = {
    getAllUser, CreateUser, UpdateUser, deleteUser, getUserWithPagination
}