import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Game from '../models/game.js';

const transformWager = (val) => {
    const int = +val;
    return isNaN(int) ? 0 : Math.abs(int);
};

const validateCoinSide = (val) => {
    return val === 'Heads' || val === 'Tails';
};

const getOppositeSide = (sidePicked) =>
    sidePicked === 'Heads' ? 'Tails' : 'Heads';

const calculateWinnings = (winStreakLength, wager) => {
    switch (winStreakLength) {
        case 5:
            return { payout: wager * 10, bonus: '10X' };
        case 3:
            return { payout: wager * 3, bonus: '3X' };
        default:
            return { payout: wager * 2, bonus: null };
    }
};

const wager = async (req, res) => {
    const { wager, coinSide } = req.body;
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

        let tokens = game.tokens;
        if (tokens <= 0) {
            return res.status(400).json({ message: 'you out of gold son' });
        }

        const sanitizedWager = transformWager(wager);
        if (sanitizedWager > tokens || !validateCoinSide(coinSide)) {
            return res.status(400).json({ message: 'Bad data' });
        }

        tokens -= sanitizedWager;

        const plays = game.plays;
        let winningStreak = game.winningStreak;

        const win = Math.random() >= 0.5;
        let winnings = {
            payout: 0,
            bonus: null,
        };

        const status = {
            flipResult: !!win ? coinSide : getOppositeSide(coinSide),
            win,
            text: win ? 'W' : 'L',
        };

        plays.push(status);

        if (win) {
            winningStreak.push(status);
            winnings = calculateWinnings(winningStreak.length, sanitizedWager);
            if (winningStreak.length === 5) winningStreak = []; // todo better
        } else {
            winningStreak = [];
        }

        const updatedGame = await Game.findOneAndUpdate(
            { user_id: userId },
            {
                tokens: tokens + winnings.payout,
                winningStreak,
                plays,
            },
            { new: true }
        );

        return res.status(200).json({
            tokens: updatedGame.tokens,
            lastTenPlays: updatedGame.plays.slice(-10),
            winningStreak: updatedGame.winningStreak,
            winnings,
            status,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default wager;
