const User = require("../models/UserModel");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= LOGIN =================

const Login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Check input
        if (!Email || !Password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        // Find user
        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(401).json({
                message: "No account is registered with this email",
                success: false
            });
        }

        // Check password
        const isMatch = await bcryptjs.compare(
            Password,
            user.Password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id
            },
            "bcjshbchsibcijw",
            {
                expiresIn: "1d"
            }
        );

        // Do NOT send password to frontend
        const userData = {
            _id: user._id,
            Fullname: user.Fullname,
            Email: user.Email
        };

        // Send response
        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: false
            })
            .json({
                message: `Welcome back ${user.Fullname}`,
                success: true,
                user: userData
            });

    } catch (error) {
        console.log("Login error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// ================= LOGOUT =================

const Logout = async (req, res) => {
    return res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })
        .json({
            message: "User logged out successfully",
            success: true
        });
};


// ================= REGISTER =================

const Register = async (req, res) => {
    try {
        const {
            Fullname,
            Email,
            Password
        } = req.body;

        // Check input
        if (!Fullname || !Email || !Password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ Email });

        if (existingUser) {
            return res.status(401).json({
                message: "User is already registered with this email",
                success: false
            });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(
            Password,
            16
        );

        // Create user
        await User.create({
            Fullname,
            Email,
            Password: hashedPassword
        });

        return res.status(200).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log("Register error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// ================= EXPORT =================

module.exports = {
    Register,
    Login,
    Logout
};