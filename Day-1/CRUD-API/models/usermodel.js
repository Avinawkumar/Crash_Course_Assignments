const mongoose  = require('mongoose');



// movies Schima for the document
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
},{
    versionKey:false
})

const User = mongoose.model('user', userSchema)


module.exports = { User}