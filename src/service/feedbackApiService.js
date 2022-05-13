import db from '../models/index'

const getFeedBack = async () => {
    try {
        let data = await db.FeedBack.findAll({
            raw: true,
            nest: true
        })
        if(data) {
            // let data = users.get({ plain: true })
            return {
                EM: 'Get Data Success',
                EC: 0,
                DT: data
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

const getFeedBackWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit

        const { count, rows } = await db.FeedBack.findAndCountAll({
            order: [['id', 'DESC']],
            offset,
            limit
        })

        let toltolPage = Math.ceil(count/limit)

        let data = {
            totalRows: count,
            toltolPage,
            data: rows
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

const CreateFeedBack = async (data) => {
    try {
        await db.FeedBack.create({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message, 
        })

        return {
            EM: "A FeedBack is created successfully!",
            EC: 0,
            DT: []
        }

    } catch (e) {
        console.log(e);
        return {
            EM: "Somthing wrongs in service",
            EC: -2,
            DT: []
        }
    }
}

const deleteFeedBack = async (id) => {
    try {
        let data = await db.FeedBack.findOne({
            where: { 
                id: id 
            }
        })

        if (data) {
            await data.destroy();
            return {
                EM: 'Delete FeedBack Success',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'FeedBack not exist',
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
    getFeedBack, CreateFeedBack, deleteFeedBack, getFeedBackWithPagination
}