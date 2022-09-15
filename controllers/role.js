const { response } = require('express')
const Role = require('../models/role');

/* GET */
const getRole = (req, res = response) => {
    const { nombre = 'no name', ocupacion } = req.query
    res.json({ msg: 'Get Api Controller', nombre, ocupacion });
}
/* PUT */
const putRole = (req, res = response) => {
    const body = req.body;
    res.json({ msg: 'Put Api Controller', body });
}
/* POST */
const postRole = async (req, res = response) => {

    const body = req.body;
    const role = new Role(body)

    //Guardar en BD
    await role.save();
    res.json({ msg: 'Post Api Controller', role });
}
/* DELETE */
const deleteRole = (req, res = response) => {
    const id = req.params.id;
    res.json({ msg: 'Delete Api Controller', id });
}

module.exports = { getRole, putRole, postRole, deleteRole };