const express = require('express');
const { User } = require('../models/usermodel');



const userRouter = express.Router();

// Create a new user
userRouter.post('/post', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all users
userRouter.get('/get', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a user by ID
userRouter.get('/get/:userId', async (req, res) => {
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
userRouter.put('/put/:userId', async (req, res) => {
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
userRouter.delete('/delete/:userId', async (req, res) => {
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