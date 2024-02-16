import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Game from '../models/game.js';

const refill = async (req, res) => {
    const { userId } = req;

    try {
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        const existingUser = await User.findOne({ _id: userId });
        if (!existingUser) {
            return res.status(404).json({ message: 'User Does Not Exist' });
        }

        const game = await Game.findOne({ user_id: req.userId });
        if (!game) {
            return res.status(400).json({ message: 'no bank' });
        }

        const updatedGame = await Game.findOneAndUpdate(
            { user_id: userId },
            {
                tokens: 100,
            },
            { new: true }
        );

        return res.status(200).json({
            tokens: updatedGame.tokens,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default refill;
