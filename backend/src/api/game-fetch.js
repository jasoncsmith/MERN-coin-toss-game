import User from '../models/user.js';
import Game from '../models/game.js';

const game = async (req, res) => {
    const { userId } = req;

    try {
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        const existingUser = await User.findOne({ _id: userId });
        if (!existingUser) {
            return res.status(404).json({ message: 'User Does Not Exist' });
        }

        const existingGame = await Game.findOne({ user_id: userId });
        if (!existingGame) {
            return res.status(400).json({ message: 'no bank' });
        }

        const { tokens = 0, plays = [], winningStreak = [] } = existingGame;

        return res.status(200).json({
            tokens: tokens,
            lastTenPlays: plays.slice(-10),
            winningStreak: winningStreak,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default game;
