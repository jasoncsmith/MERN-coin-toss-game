import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    tokens: { type: Number, required: true },
    winningStreak: { type: Array },
    plays: { type: Array },
});

export default mongoose.model('Game', gameSchema);
