import feedbackApiService from '../service/feedbackApiService'

const readed = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit

            let data = await feedbackApiService.getFeedBackWithPagination(+page, +limit)

            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, // ERROR CODE
                DT: data.DT // Data
            })
        } else {
            let data = await feedbackApiService.getFeedBack()

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
        let data = await feedbackApiService.CreateFeedBack(req.body)
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
        let data = await feedbackApiService.deleteFeedBack(req.body.id)
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
    readed, created, deleted
}