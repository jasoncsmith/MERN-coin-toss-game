import express from 'express';

import auth from '../utils/auth.js';

import game from './game-fetch.js';
import wager from './game-wager.js';
import refill from './game-refill.js';

const router = express.Router();

router.get('/', auth, game);
router.post('/wager', auth, wager);
router.post('/refill', auth, refill);

export default router;
