import roleApiService from '../service/roleApiService'
import userApiService from '../service/userApiService'

const readed = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit

            let data = await userApiService.getUserWithPagination(+page, +limit)

            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, // ERROR CODE
                DT: data.DT // Data
            })
        } else {
            let data = await userApiService.getAllUser()

            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, // ERROR CODE
                DT: data.DT // Data
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from sever', //error message
            EC: '-1', // ERROR CODE
            DT: '', // Data
            ET: ''
        })
    }
}

const created = async (req, res) => {
    try {
        let data = await roleApiService.CreateNewGroup(req.body)
        return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, // ERROR CODE
                DT: data.DT // Data
            })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from sever', //error message
            EC: '-1', // ERROR CODE
            DT: '', // Data
        })
    }
}

const updated = async (req, res) => {
    try {
        let data = await userApiService.UpdateUser(req.body)
        return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, // ERROR CODE
                DT: data.DT // Data
            })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from sever', //error message
            EC: '-1', // ERROR CODE
            DT: '', // Data
            ET: ''
        })
    }
}

const deleted = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id)
        return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, // ERROR CODE
                DT: data.DT // Data
            })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from sever', //error message
            EC: '-1', // ERROR CODE
            DT: '', // Data
            ET: ''
        })
    }
}


module.exports = {
    readed, created, updated, deleted
}