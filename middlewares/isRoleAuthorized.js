
const isRoleAuthorized = (...role) => { // cuando se coloca ...role significa que agrupará n parametros  en un array
    
    return (req, res, next) => {
        console.log(role)
        if(!role.includes(req.user.role)){
          return res.status(404).json({msg:'Role not Authotized'})
        }
        next();
    }
}


module.exports = { isRoleAuthorized }