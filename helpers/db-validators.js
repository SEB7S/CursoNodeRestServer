

const Role = require('../models/role');
const User = require('../models/user');


const isValidRole = async (role = '') => {
    const duplicatedRole = await Role.findOne({ role });
    if (!duplicatedRole) {
        throw new Error(`Role Not Found ${role}`);
    }
}

const isEmailDB = async (email = '') => {
  const checkEmail =  User.findOne({ email });
if (checkEmail) {
    throw new Error(`Email Duplicated ${email}`);
}
}


module.exports = { isValidRole, isEmailDB }