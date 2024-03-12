import express from 'express'

import verifyToken from '../utils/verifyToken.js'
import { getGame, wager, patchGame } from '../controllers/gameController.js'

const router = express.Router()

router.use(verifyToken)

router.get('/', getGame)
router.post('/wager', wager)
router.patch('/refill', patchGame)

export default router
