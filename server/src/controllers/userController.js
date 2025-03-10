const User = require('../models/User');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const { z } = require('zod');
const crypto = require("crypto");
const { signupSchema, signinSchema } = require('../utils/validation');
const { sendOtpEmail, sendContactEmail } = require('../utils/emailService');


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
    const { username, email, bio, contact, city, hasSpun, prize } = req.body;

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
                city,
                hasSpun,
                prize,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ success: true, msg: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating profile', error });
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


        res.status(200).json({ success: true, msg: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error changing password', error });
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user);

        const otp = crypto.randomInt(100000, 999999).toString();

        const hashedOtp = await bcrypt.hash(otp, 10);

        user.resetOtp = hashedOtp;
        user.resetOtpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();
        await sendOtpEmail(email, otp);

        return res.status(200).json({ success: true, message: "OTP sent to email" });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

async function otpVerification(req, res) {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currentTime = Date.now();
        if (currentTime > user.resetOtpExpiry) {
            return res.status(400).json({ message: 'OTP has expired, please request a new one' });
        }

        const isOtpValid = await bcrypt.compare(otp, user.resetOtp);
        if (!isOtpValid) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        return res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

async function resetPassword(req, res) {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        user.password = newPassword.trim();
        await user.save();

        return res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function contactUs(req, res) {
    try {
        const { name, email, subject, message } = req.body;

        console.log("Received Contact Form Data:", req.body);

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        await sendContactEmail({ name, email, subject, message });

        res.status(200).json({ message: "Your message has been sent successfully!" });
    } catch (error) {
        console.error("Error sending contact email:", error);
        res.status(500).json({ message: "Failed to send your message. Please try again later." });
    }
}


async function updateSpin(req, res) {
    try {
        const { userId, prize } = req.body;

        if (!userId || !prize) {
            return res.status(400).json({ message: "User ID and prize are required." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.hasSpun) {
            return res.status(400).json({ message: "User has already spun the wheel." });
        }

        user.hasSpun = true;
        user.prize = prize;
        await user.save();

        res.status(200).json({ message: "Spin updated successfully.", prize });
    } catch (error) {
        console.error("Error updating spin:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}
module.exports = { userSignup, updateSpin, userSignin, userProfile, currentUser, editProfile, changePassword, forgotPassword, otpVerification, resetPassword, contactUs }