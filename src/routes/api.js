import express from "express";
import apiController from '../controllers/apiController';
import userController from '../controllers/userController';
import groupController from '../controllers/groupController';
import { checkUserJWT, checkUserPerMission } from '../middleware/JWTAction'
import roleController from '../controllers/roleController'

const router = express.Router()

/**
 * 
 * @param {*} app : express app
 */


const initApiRoutes = (app) => {
    router.all('*', checkUserJWT,checkUserPerMission)
    //rest api
    //GET - R, POST = C , PUT - U , Delete - D
    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    router.post("/logout", apiController.handleLogOut)
    
    router.get("/account", userController.getUserAccount)
    //user routes
    router.get("/user/read", userController.readed)
    router.post("/user/create", userController.created)
    router.put("/user/update", userController.updated)
    router.delete("/user/delete", userController.deleted)

    //routes routes
    router.get("/role/read", roleController.readed)
    router.post("/role/create", roleController.created)
    router.put("/role/update", roleController.updated)
    router.delete("/role/delete", roleController.deleted)
    router.get("/role/by-group/:groupId", roleController.getRoleByGroup)
    router.post("/role/assign-to-group", roleController.assignToGroup)
    
    //group routes
    router.get("/group/read", groupController.readFunc)

    return app.use("/api/v1/", router)
}

export default initApiRoutes