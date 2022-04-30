import db from "../models/index"

const CreateNewGroup = async (roles) => {
    try {
        let curentRoles = await db.Role.findAll({
            attributes: ["url","description"],
            raw: true,
        })
        const persists = roles.filter(({url: url1}) => !curentRoles.some(({url: url2}) => url1 === url2))
        if(persists.length === 0) {
            return {
                EM: 'Nothing to create',
                EC: 0,
                DT: []
            }
        }
        await db.Role.bulkCreate(persists)
        return {
                EM: `Create Succuess ${persists.length} roles...`,
                EC: 0,
                DT: []
            }
    } catch(e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const getRoleWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit

        const { count, rows } = await db.Role.findAndCountAll({
            attributes: ["id", "url", "description"],
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

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll({})
        return {
                EM: `Get all roles sucess`,
                EC: 0,
                DT: data
            }
    } catch(e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: {
                id
            }
        })
        if(role) {
            await role.destroy()
            return {
                EM: `Delete roles sucess`,
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'Delete not exist',
                EC: 2,
                DT: []
            }
        }
    } catch(e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const getRoleByGroup = async (id) => {
    try { 
        if(!id) {
            return {
                EM: `Not found any roles`,
                EC: 2,
                DT: []
            }
        }

        let roles = await db.Group.findOne({
            where: {
                id
            },
            attributes: ["id", "name", "description"],
            include: { 
                model: db.Role, 
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            }
        })

        return {
            EM: 'Get roles by group success',
            EC: 0,
            DT: roles
        }
    } catch(e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}   
    
const assignRoleToGroup = async (data) => {
    try { 
        await db.Group_Role.destroy({
            where: {
                groupId: +data.groupId,
            }
        })
        await db.Group_Role.bulkCreate(data.groupRoles)
        
        return {
            EM: 'Get assign roles to group success',
            EC: 0,
            DT: []
        }
    } catch(e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

module.exports = {
    CreateNewGroup, getRoleWithPagination, getAllRoles, deleteRole, getRoleByGroup, assignRoleToGroup
}