const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { addUserMiddleware, loginUserMiddleware, authMiddleware,  } = require('../middleware/middleware');
const { User } = require("../models/User");

const userRouter = express.Router();

userRouter.post('/signup', addUserMiddleware, async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        console.log(email);

        const existingUser = await User.findOne({email});

        if (existingUser){
            return res.status(400).json({
                msg: "Email already exists",
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username,
                email
            }
        });
    } catch (err) {
        next(err);
    }
});

userRouter.post('/login', loginUserMiddleware, async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({
            email
        });

        if (!user){
            return res.status(400).json({
                msg: "User does not exist"
            })
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid){
            return res.status(400).json({
                msg: "Wrong password"
            })
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email
            }
        });
    } catch (err) {
        next(err);
    }
});

userRouter.get('/', (req, res, next) => {
    try {
        User.find({})
        .then((result) => {
            res.json({
                result
            });
        });
    } catch (err) {
        next(err);
    }
});

userRouter.get('/me', authMiddleware, async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

userRouter.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user){
            res.status(404).json({
                msg: "User not found"
            })
        }

        res.json(user)
    } catch (err){
        next(err);
    }
});


module.exports = userRouter;