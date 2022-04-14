import userService from '../service/userService'

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

const handerUserPage = async (req, res) => {

    let userList = await userService.getUserList()
    return res.render("user.ejs", {
        userList,
    })
}

const handleCreateUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    // let hashPassWord = bcrypt.hashSync(password, salt)
    // console.log("check Passwd", hashPassWord);

    // let checkPwd = bcrypt.compareSync(password, hashPassWord); // true
    // console.log("checl pwd", checkPwd);

    userService.createNewUser(email, password, username)
    return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return res.redirect("/user");
}

const handleGetUser = async (req, res) => {
    let id = req.params.id
    let user = await userService.getUserById(id)
    let userData = {}
    if(user && user.length > 0) {
        userData = user[0]
    }

    return res.render("user_update.ejs", {
        userData
    })
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let id = req.body.id

    await userService.updateUserInfo(email, username, id)
    return res.redirect("/user");
}

module.exports = {
    handleHelloWorld,
    handerUserPage,
    handleCreateUser,
    handleDeleteUser,
    handleGetUser,
    handleUpdateUser
}