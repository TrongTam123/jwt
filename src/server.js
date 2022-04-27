require('dotenv').config()
import express from "express"
import configViewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web"
import initApiRoutes from "./routes/api"
import bodyParser from 'body-parser'
import connection from './config/connectDB'
import configCors from "./config/cors"
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 6060;

//Config Cors
configCors(app)

// config view engine
configViewEngine(app)

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cofig cookie parse
app.use(cookieParser())

// connection
connection()

//init web routes
initWebRoutes(app)
initApiRoutes(app)

app.use((req, res) => {
    return res.send("404 not found")
})

app.listen(PORT, () => {
    console.log("JWT backend in the port" + PORT);
})