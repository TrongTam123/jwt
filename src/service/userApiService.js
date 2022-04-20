import db from '../models/index'

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
        await db.User.create({

        })
    } catch (e) {

    }
}

const UpdateUser = async (data) => {
    try {
        let user = db.User.findOne({
            where: {
                id: data.id
            }
        })
        if (user) {
            user.save({

            })
        } else {

        }
    } catch (e) {

    }
}

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: { id }
        })
    } catch (e) {

    }
}

module.exports = {
    getAllUser, CreateUser, UpdateUser, deleteUser, getUserWithPagination
}