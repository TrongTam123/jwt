import express from "express"
import configViewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web"
import initApiRoutes from "./routes/api"
require('dotenv').config()
import bodyParser from 'body-parser'
import connection from './config/connectDB'
import configCors from "./config/cors"
import { CreateJWT, verifyToken } from './middleware/JWTAction'

const app = express()
const PORT = process.env.PORT || 6060;

//Config Cors
configCors(app)
//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config view engine
configViewEngine(app)

// connection
connection()

// test jwt
CreateJWT()
let decodedData = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGFtbSIsImFkZHJlc3MiOiJIYSBOb2kiLCJpYXQiOjE2NTA3ODQzNTl9.yY2Eat636QE7ZJ37Qisu8jekLtDOn6P9OMCOx4Cf9ik")
console.log(decodedData);
//init web routes
initWebRoutes(app)
initApiRoutes(app)

app.listen(PORT, () => {
    console.log("JWT backend in the port" + PORT);
})