
import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existUser = await User.findOne({ email });
        if (!existUser) return res.status(404).json({ message: 'User does not exist ' });
        const isCorrectPass = await bcrypt.compare(password, existUser.password);

        if (!isCorrectPass) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({
            email: existUser.email,
            id: existUser._id
        }, "test", { expiresIn: "1h" });

        res.status(200).json({
            result: existUser,
            token
        })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const existUser = await User.findOne({ email });
        if (existUser) res.status(400).json({ message: 'User is already exist ' });
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match.' });

        const hashPass = await bcrypt.hash(password, 12);
        const result = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashPass
        });

        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, "test", { expiresIn: '1h' })

        res.status(200).json({
            result,
            token
        })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}