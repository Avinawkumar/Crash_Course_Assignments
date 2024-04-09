const express = require('express');
const { User } = require('../models/usermodel');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { log } = require('../middleware/log.middleware');


const userRouter = express.Router();




//register routes
// while registering encrypting password with bcrypt and hashing algorithm

userRouter.post("/signup", log, async (req, res) =>{
    const {username,email,password}=req.body
    try {
        bcrypt.hash(password, 8, async (err, hash)=>{
            const user=new User({username,email,password:hash})
            try {
                await user.save()
                res.status(200).send({msg:"registration successful"})
            } catch (error) {
                res.status(200).send({msg:"user already registered"})
            }
                
            })

            // res.status(200).send({msg:"registration successful"})
        
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
});

// login routes
// while login comparing encrypted password that is saved in DB in incrypted format
userRouter.post("/login",log, async (req, res) => {
    const {email,password} = req.body;
    try {
        const user=await User.findOne({email})
       
            if(user){
                // compairing the password
               bcrypt.compare(password, user.password, function(err, result) {
                
                   if(result){
                    // creating jwt token for auth
                   const token = jwt.sign({ "userID":user._id }, 'masai');
                   res.status(200).send({"msg":"Login Successfull","token":token})
                   }
                   else {
                    {res.status(400).send({msg:"Wrong Password"})}
                   }
                });
            }
             else {
              res.status(400).send({msg:"Wrong Password"})
            }

   
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
})




// Get all users
userRouter.get('/get',log, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.get("/page/:page", async (req,res) =>{
    let {page} = req.params;
    let limitPage = 2
    let skipPage = (+page - 1)* limitPage
    try {
        const data = await User.find().skip(skipPage).limit(limitPage)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
})



// Get a user by ID
userRouter.get('/get/:userId',log, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a user
userRouter.put('/put/:userId',log, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedUser) {
            res.status(404).send('User not found');
        } else {
            res.json(updatedUser);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a user
userRouter.delete('/delete/:userId',log, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            res.status(404).send('User not found');
        } else {
            res.status(204).send("user deleted");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = userRouter;