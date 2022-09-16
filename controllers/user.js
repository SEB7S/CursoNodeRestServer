const { response } = require('express')
const User = require('../models/user');
const bcryptjs = require('bcryptjs'); // npm install bcryptjs

/* GET */
const getUser = async (req, res = response) => {
    const { limit = 5, since = 0 } = req.query
    const query = {status:true}
    const [count, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(since).limit(limit)
    ])
    res.json({ msg: 'Get Api Controller', count, user});
}
/* PUT */
const putUser = async (req, res = response) => {
    const id = req.params;
    const { _id, password, google, ...user } = req.body;
    if (password) {
        //Encriptar Password 
        const salt = bcryptjs.genSaltSync(); // Dificulta de encriptacion
        user.password = bcryptjs.hashSync(password, salt);
    }

    const userUpdate = await User.findByIdAndUpdate(id, user);
    res.json({ msg: 'Put Api Controller', userUpdate });
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
const deleteUser = async (req, res = response) => {
    const {id} = req.params;
    //Para Borrar Fisicamente
   /*  const user = await User.findByIdAndDelete(id); */
   //Eliminar Cambiando 'status' del usuario de
   const user = await User.findByIdAndUpdate(id, {status:false});


    res.json({ msg: 'Delete Api Controller', user });
}

module.exports = { getUser, putUser, postUser, deleteUser };