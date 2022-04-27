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

module.exports = {
    CreateNewGroup
}