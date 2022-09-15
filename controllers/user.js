const { response } = require('express')
const User = require('../models/user');
const bcryptjs = require('bcryptjs'); // npm install bcryptjs

/* GET */
const getUser = (req, res = response) => {
    const { nombre = 'no name', ocupacion } = req.query
    res.json({ msg: 'Get Api Controller', nombre, ocupacion });
}
/* PUT */
const putUser = (req, res = response) => {
    const body = req.body;
    res.json({ msg: 'Put Api Controller', body });
}
/* POST */
const postUser = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role })

    //Encriptar Password 
    const salt = bcryptjs.genSaltSync(); // Dificulta de encriptacion
    user.password = bcryptjs.hashSync(password, salt);
    //Guardar en BD
    await user.save();
    res.json({ msg: 'Post Api Controller', user });
}
/* DELETE */
const deleteUser = (req, res = response) => {
    const id = req.params.id;
    res.json({ msg: 'Delete Api Controller', id });
}

module.exports = { getUser, putUser, postUser, deleteUser };