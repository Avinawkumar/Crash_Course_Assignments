const mongoose  = require('mongoose');
require("dotenv").config()

const connected_to_LocalDb = mongoose.connect(process.env.MONGO_URL)



module.exports = connected_to_LocalDb