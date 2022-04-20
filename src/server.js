import express from "express"
import configViewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web"
import initApiRoutes from "./routes/api"
require('dotenv').config()
import bodyParser from 'body-parser'
import connection from './config/connectDB'
import configCors from "./config/cors"

const app = express()
const PORT = process.env.PORT || 6060;

//Static files
app.use(express.static('public'))
app.use('css', express.static(__dirname + 'public/css'))
app.use('js', express.static(__dirname + 'public/js'))
app.use('img', express.static(__dirname + 'public/img'))
app.use('svg', express.static(__dirname + 'public/svg'))
app.use('eot', express.static(__dirname + 'public/eot'))
app.use('scss', express.static(__dirname + 'public/scss'))
app.use('less', express.static(__dirname + 'public/less'))

//Config Cors
configCors(app)
//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config view engine
configViewEngine(app)

// connection
connection()

//init web routes
initWebRoutes(app)
initApiRoutes(app)

app.listen(PORT, () => {
    console.log("JWT backend in the port" + PORT);
})