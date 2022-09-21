const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token') // x-token , se puede colocar cualquier name y sirve para declarar el parametro que vendrá en el header con el token
    //validar que haya token
    if (!token) {
        return res.status(401).json({ msg: 'Token not Valid - not token' })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const user = await User.findById(payload.uid);

        if(!user) {
          return  res.status(401).json({ msg: 'User not found' })
        }
        req.user = user;
        if (user.status) {
            next();
        } else {
            return res.status(401).json({ msg: `User ${user.name} inactive` })
        }


    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Token not Valid - other token' })
    }


}




module.exports = { validateJWT }