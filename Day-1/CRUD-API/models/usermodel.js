const mongoose  = require('mongoose');



// movies Schima for the document
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt : { type: Date, default: Date.now }
},{
    versionKey:false
})

const User = mongoose.model('user', userSchema)


module.exports = { User}