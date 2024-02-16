import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';
import Game from '../models/game.js';

dotenv.config();

const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User Already Exist' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password Does Not Match' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        const game = await Game.create({
            user_id: newUser._id,
            tokens: 100,
            plays: [],
            winningStreak: [],
        });

        const token = jwt.sign(
            {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                password: newUser.hashedPassword,
            },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default signup;
