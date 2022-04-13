import userService from '../service/userService'

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

const handerUserPage = (req, res) => {
    return res.render("user.ejs")
}

const handleCreateUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    // let hashPassWord = bcrypt.hashSync(password, salt)
    // console.log("check Passwd", hashPassWord);

    // let checkPwd = bcrypt.compareSync(password, hashPassWord); // true
    // console.log("checl pwd", checkPwd);

    // userService.createNewUser(email, password, username)
    userService.getUserList()
    
    return res.send("handleCreateUser");
}

module.exports = {
    handleHelloWorld,
    handerUserPage,
    handleCreateUser
}