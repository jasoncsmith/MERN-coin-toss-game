import express from 'express';
import login from './user-login.js';
import signup from './user-signup.js';

import auth from '../utils/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

export default router;
