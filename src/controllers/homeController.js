const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

const handerUserPage = (req, res) => {
    return res.render("user.ejs")
}

module.exports = {
    handleHelloWorld,
    handerUserPage
}