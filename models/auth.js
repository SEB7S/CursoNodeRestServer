const { Schema, model } = require('mongoose') ;
 
 
const AuthSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email required'],
    },
    password: {
        type: String,
        required: [true, 'role required'],
    }
});

module.exports =  model( 'Auth', AuthSchema);

