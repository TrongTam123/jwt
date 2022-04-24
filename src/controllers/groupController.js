import groupService from './../service/groupService'

const readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroup()

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

module.exports = {
    readFunc
}