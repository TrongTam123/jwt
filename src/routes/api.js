import express from "express";
import apiController from '../controllers/apiController';
import userController from '../controllers/userController';
import groupController from '../controllers/groupController';
import { checkUserJWT, checkUserPerMission } from '../middleware/JWTAction'
import roleController from '../controllers/roleController'
import categoryController from '../controllers/categoryController'
import postController from '../controllers/postController'
import feedbackController from '../controllers/feedbackController'

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

    //role routes
    router.get("/role/read", roleController.readed)
    router.post("/role/create", roleController.created)
    router.put("/role/update", roleController.updated)
    router.delete("/role/delete", roleController.deleted)
    router.get("/role/by-group/:groupId", roleController.getRoleByGroup)
    router.post("/role/assign-to-group", roleController.assignToGroup)

    //category routes
    router.get("/category/read", categoryController.readed)
    router.post("/category/create", categoryController.created)
    router.put("/category/update", categoryController.updated)
    router.delete("/category/delete", categoryController.deleted)
    router.get("/category/get-category", categoryController.getAllCategory)
    router.get("/category/get-category-by-id", categoryController.getCategoryById)

    //post routes
    router.get("/post/read", postController.readed)
    router.post("/post/create", postController.created)
    router.put("/post/update", postController.updated)
    router.delete("/post/delete", postController.deleted)
    router.get("/post/get-detail-post", postController.getPostById)
    router.get("/post/get-current-post", postController.getPostCurrent)
    router.get("/post/get-all-current-post", postController.getAllPostCurrent)

    //feedback
    router.get("/feedback/read", feedbackController.readed)
    router.post("/feedback/create", feedbackController.created)
    router.delete("/feedback/delete", feedbackController.deleted)
    //group route
    router.get("/group/read", groupController.readFunc)

    return app.use("/api/v1/", router)
}

export default initApiRoutes