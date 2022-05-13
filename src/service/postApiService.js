import db from '../models/index'

const getPost = async (id) => {
    try {
        if(!id) {
            return {
                EM: "Don't have post",
                EC: -1,
                DT: []
            }
        } 
        let post = await db.Post.findOne({
            where : {
                id: id
            },
            include: 
                {
                    model: db.Category,
                    attributes: ["name", "description", "id"],
                },
            raw: true,
            nest: true
        })
         
        if(post) {
            return {
                EM: 'Get Data Success',
                EC: 0,
                DT: post
            }
        } else {
            return {
                EM: 'Get Data Falied',
                EC: -1,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const getPostRecent = async () => {
    try {
        let post = await db.Post.findAll({
            order: [['id', 'ASC']],
            limit: 2,
            raw: true,
            nest: true
        })
        if(post) {
            // let data = users.get({ plain: true })
            return {
                EM: 'Get Data Success',
                EC: 0,
                DT: post
            }
        } else {
            return {
                EM: 'Get Data Falied',
                EC: -1,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const getAllCurrentPost = async (page, limit) => {
    try {
        let offset = (page - 1) * limit

        const { count, rows } = await db.Post.findAndCountAll({
            include: {
                model: db.Category,
                attributes: ["name", "description", "id"],
            },
            order: [['id', 'ASC']],
            offset,
            limit
        })

        let toltolPage = Math.ceil(count/limit)

        let data = {
            totalRows: count,
            toltolPage,
            users: rows
        }
        return {
                EM: 'Fetch OK',
                EC: 0,
                DT: data
            }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const getAllPost = async () => {
    try {
        let post = await db.Post.findAll({
            include: 
                {
                    model: db.Category,
                    attributes: ["name", "description", "id"],
                },
            raw: true,
            nest: true
        })
        if(post) {
            // let data = users.get({ plain: true })
            return {
                EM: 'Get Data Success',
                EC: 0,
                DT: post
            }
        } else {
            return {
                EM: 'Get Data Falied',
                EC: -1,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const getPostWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit

        const { count, rows } = await db.Post.findAndCountAll({
            include: {
                model: db.Category,
                attributes: ["name", "description", "id"],
            },
            order: [['id', 'DESC']],
            offset,
            limit
        })

        let toltolPage = Math.ceil(count/limit)

        let data = {
            totalRows: count,
            toltolPage,
            users: rows
        }
        return {
                EM: 'Fetch OK',
                EC: 0,
                DT: data
            }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const CreatePost = async (data) => {
    try {
        await db.Post.create(data)
        return {
                EM: 'Create Post Success',
                EC: 0,
                DT: []
            }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const UpdatePost = async (data) => {
    try {
        if(!data.categoryId) {
            return {
                EM: 'Update Error with categoryId empty',
                EC: 1,
                DT: 'category'
            }
        }
        let post = await db.Post.findOne({
            where: {
                id: data.id
            }
        })
        if (post) {
         await post.update({
                title: data.title,
                description: data.description,
                content: data.content,
                datePost: data.datePost,
                img: data.img,
                comments: data.comments,
                categoryId: data.categoryId,
            })
            return {
                EM: 'Update Post Success',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'Post not found',
                EC: 1,
                DT: ''
            }
        }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const deletePost = async (id) => {
    try {
        let post = await db.Post.findOne({
            where: { 
                id: id 
            }
        })

        if (post) {
            await post.destroy();
            return {
                EM: 'Delete Post Success',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'Post not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

module.exports = {
    getAllPost, CreatePost, UpdatePost, deletePost, getPostWithPagination, getPost, getPostRecent, getAllCurrentPost
}