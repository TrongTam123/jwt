import express from "express"
import apiController from '../controllers/apiController'
import userController from '../controllers/userController'

const router = express.Router()

/**
 * 
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {
    //rest api
    //GET - R, POST = C , PUT - U , Delete - D
    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)

    router.get("/user/read", userController.readed)
    router.post("/user/create", userController.created)
    router.put("/user/update", userController.updated)
    router.delete("/user/delete", userController.deleted)

    return app.use("/api/v1/", router)
}

export default initApiRoutes