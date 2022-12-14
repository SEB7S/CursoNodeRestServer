const { Schema, model } = require('mongoose') ;
 
 
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es Obligatoria']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emum: ['USER_ROLE', 'ADMIN_ROLE'],
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function (){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports =  model( 'User', UserSchema);

