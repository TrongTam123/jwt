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

module.exports = {
    handleHelloWorld,
    handerUserPage,
    handleCreateUser,
    handleDeleteUser
}