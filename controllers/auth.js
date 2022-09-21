const { response } = require('express')
const Auth = require('../models/auth');
const User = require('../models/user');
const bcryptjs = require('bcryptjs'); // npm install bcryptjs
const { createJWT } = require('../helpers/createJWT');
/* POST */
const login = async (req, res = response) => {

    const { email, password } = req.body;
    /* const login = new Auth({ email, password }) */
    try {
        // verificar si el EMAIL existe con

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Email or password incorrect -email', email, password });
        }
        //Si el usuario está activo
        if (!user.status) {
            return res.status(400).json({ msg: 'Email inactive - status', email, password });
        }
        //Verificar la contraseña
        const passwordCrypt = bcryptjs.compareSync(password, user.password);
        if (!passwordCrypt) {
            return res.status(400).json({ msg: 'Email or password incorrect -pswd', email, password });
        }
        //construir TOKEN
        const token = await createJWT(user.id)

        res.json({ msg: 'Login OK', user, token });

    } catch (error) {
        res.status(500).json({ msg: error })
    }
    //Guardar en BD
    /*   await login.save(); */

}

module.exports = { login };