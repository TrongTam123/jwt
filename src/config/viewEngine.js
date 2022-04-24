import express from "express"

/**
 * 
 * @param {*} app - express app 
 */

const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
    app.use('css', express.static(__dirname + 'public/css'))
    app.use('js', express.static(__dirname + 'public/js'))
    app.use('img', express.static(__dirname + 'public/img'))
    app.use('svg', express.static(__dirname + 'public/svg'))
    app.use('eot', express.static(__dirname + 'public/eot'))
    app.use('scss', express.static(__dirname + 'public/scss'))
    app.use('less', express.static(__dirname + 'public/less'))
}

export default configViewEngine