import db from '../models/index'

const getGroupWithRoles = async (user) => {
    let roles = await db.Group.findOne({
        where: {
            id: user.groupId
        },
        attributes: ["id", "name", "description"],
        include: { 
            model: db.Role, 
            attributes: ["id", "url", "description"],
            through: { attributes: [] }
        }
    })
    return roles ? roles : {}
}

const getPostWithCategory = async (data) => {
    let post = await db.Post.findAll({
        where: {
            id: data.categoryId
        },
        include: { 
            model: db.Category, 
            through: { attributes: [] }
        }
    })
    return post ? post : {}
}

module.exports = {
    getGroupWithRoles, getPostWithCategory
}