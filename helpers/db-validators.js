

const Role = require('../models/role');
const User = require('../models/user');


const isValidRole = async (role = '') => {
    const duplicatedRole = await Role.findOne({ role });
    if (!duplicatedRole) {
        throw new Error(`Role Not Found ${role}`);
    }
}

const isEmailDB = async (email = '') => {
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
        throw new Error(`Email Duplicated ${email}`);
    }
}

const isUserDB = async( id ) => {

    // Verificar si el usuario existe
    const checkUser = await User.findById(id);
    if ( !checkUser ) {
        throw new Error(`El id no existe ${ id }`);
    }
}




module.exports = { isValidRole, isEmailDB, isUserDB }