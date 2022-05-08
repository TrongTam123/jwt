import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleRegister = async(req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password || !req.body.username) {
            return res.status(200).json({
                EM: 'Missing required parameters', //error message
                EC: '1', // ERROR CODE
                DT: '' // Data
            })
        }
        if(req.body.password && req.body.password.length < 4) {
             return res.status(200).json({
                EM: 'Your password must have have more than 4 letters', //error message
                EC: '1', // ERROR CODE
                DT: '' // Data
            })
        }

        // Service: create user
        let data = await loginRegisterService.registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, // ERROR CODE
            DT: '', // Data
            ET: data.ET
        })
    } catch(e) {
        return res.status(500).json({
            EM: 'error from sever', //error message
            EC: '-1', // ERROR CODE
            DT: '', // Data
            ET: ''
        })
    }
}

const handleLogin = async (req, res)  => {
    try {
        let data = await loginRegisterService.handleLogin(req.body)
        //set cookie
        console.log(data);
        if(data && data.DT.access_token){
            res.cookie("jwt", data.DT.access_token, {
                httpOnly: true, 
                maxAge: 60 * 60 * 1000
            })
        }
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, // ERROR CODE
            DT: data.DT, // Data
            ET: data.ET
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

const handleLogOut = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EM:'Clear cookie done', //error message
            EC: 0,
            DT: '', // Data
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
    testApi, handleRegister, handleLogin, handleLogOut
}