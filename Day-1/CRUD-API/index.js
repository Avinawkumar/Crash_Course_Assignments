const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
const connected_to_LocalDb = require('./configs/db');
const userRouter = require('./routes/userroutes');


require("dotenv").config() // using .env for port and db
const app = express();
app.use(cors())
app.use(express.json()); // ==> important;

app.use(bodyParser.json());

app.get("/", (req,res) =>{
    res.send("welcome to crud api")
})



app.use("/user", userRouter)



// exporting the app
module.exports = app

app.listen(process.env.port , async() =>{
    try {
        await connected_to_LocalDb
        console.log("connected to local_mongodb");
    } catch (error) {
        console.log("not connected to local_mongodb");
        console.log(error);
    }
    console.log(`Server is running on port ${process.env.port}`);
});