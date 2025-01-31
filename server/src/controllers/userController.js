const User = require('../models/User');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { signupSchema, signinSchema } = require('../utils/validation');


async function userSignup(req, res) {
    try {
        const { username, password, email, contact, gender, city } = signupSchema.parse(req.body);

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = await User.create({
            username,
            password,
            email,
            profilePicUrl: "https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg",
            gender,
            contact,
            city,
        });

        res.clearCookie("auth_token", {
            httpOnly: true,
            domain: "localhost",
            signed: true,
        });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });

            const expires = new Date();
            expires.setDate(expires.getDate() + 7);

            res.cookie("auth_token", token, {
                path: "/",
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true,
                secure: true,
            });

            return res.status(201).json({
                user: user._id,
                name: user.username,
                email: user.email,
                token: token,
            });
        }
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ msg: error.errors });
        }
        res.status(411).json({ msg: "Email is already registered" });
    }
}

async function userSignin(req, res) {
    const { username, password } = signinSchema.parse(req.body);
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: 'user does not exists' });
        }

        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(password.trim(), existingUser.password.trim());

            res.clearCookie("auth_token", {
                httpOnly: true,
                domain: "localhost",
                signed: true,
            });


            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid Password' });
            }

            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });

            //creating new cookie
            const expires = new Date();
            expires.setDate(expires.getDate() + 7);

            res.cookie("auth_token", token, {
                path: "/",
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true,
                secure: true,
            });

            return res
                .status(200)
                .json({
                    user: existingUser._id,
                    name: existingUser.username,
                    email: existingUser.email,
                    token,
                });
        }
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(err => err.message);
            console.log("Zod Validation Error:", errorMessages); 
            return res.status(400).json({ msg: errorMessages }); 
        }
        res.status(400).json({ msg: "Invalid credentials" })

    }
}

//current user
async function currentUser(req, res) {
    if (req.userId) {
        const id = req.userId;
        const user = await User.findById(id);
        return res.send({ user: user })
    } else {
        return res.status(411).json({ msg: "Sign in required" })
    }
}

//auth check
async function userProfile(req, res) {
    res.status(200).send({ message: "Hello", userId: req.userId });
}

async function editProfile(req, res) {
    const { userId } = req.params;
    const { username, email, bio, contact, city } = req.body;

    const profilePicUrl = req.file 
        ? req.file.path 
        : "https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg";

    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { 
                username, 
                email,
                bio,
                profilePicUrl,
                contact,
                city 
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ msg: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
}

async function changePassword(req, res) {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword.trim(), user.password.trim());
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid old password' });
        }
        user.password = newPassword.trim();  
        await user.save();  
        

        res.status(200).json({ msg: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password', error });
    }
}



module.exports = { userSignup, userSignin, userProfile, currentUser, editProfile, changePassword }