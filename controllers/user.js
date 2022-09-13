const { response } = require('express')

const getUser = (req, res = response) => {
    const {nombre = 'no name', ocupacion} = req.query
    res.json({ msg: 'Get Api Controller', nombre, ocupacion });
}
const putUser = (req, res = response) => {
    const body = req.body;
    res.json({ msg: 'Put Api Controller', body });
}
const postUser = (req, res = response) => {
    res.json({ msg: 'Post Api Controller' });
}
const deleteUser = (req, res = response) => {
    const id = req.params.id;
    res.json({ msg: 'Delete Api Controller', id });
}


module.exports = { getUser, putUser, postUser, deleteUser };