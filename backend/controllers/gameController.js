import Game from '../models/game.js'
import catchAsyncError from '../utils/catchAsyncError.js'
import AppError from '../utils/appError.js'

const getOppositeSide = sidePicked => (sidePicked === 'Heads' ? 'Tails' : 'Heads')

const transformWager = val => {
  const int = +val
  return isNaN(int) ? 0 : Math.abs(int)
}

const validateCoinSide = val => {
  return val === 'Heads' || val === 'Tails'
}

const calculateWinnings = (winStreakLength, wager) => {
  switch (winStreakLength) {
    case 5:
      return { payout: wager * 10, bonus: '10X' }
    case 3:
      return { payout: wager * 3, bonus: '3X' }
    default:
      return { payout: wager * 2, bonus: null }
  }
}

export const createGame = async user_id => {
  try {
    return await Game.create({
      user_id,
      tokens: 100,
      plays: [],
      winningStreak: [],
    })
  } catch (err) {
    return err
  }
}

export const getGame = catchAsyncError(async (req, res, next) => {
  const { userId: user_id } = req

  const existingGame = await Game.findOne({ user_id })

  if (!existingGame) {
    // will call global err handler middleware
    return next(new AppError('Game not found', 404))
    // return res.status(404).json({ message: 'Game not found' })
  }

  const { tokens = 0, plays = [], winningStreak = [] } = existingGame

  res.status(200).json({
    tokens: tokens,
    lastTenPlays: plays.slice(-10),
    winningStreak: winningStreak,
  })
})

export const patchGame = catchAsyncError(async (req, res, next) => {
  const { userId: user_id } = req

  const updatedGame = await Game.findOneAndUpdate(
    { user_id },
    {
      tokens: 100,
    },
    { new: true }
  )

  if (!updatedGame) {
    return next(new AppError('Game not found', 404))
  }

  return res.status(200).json({
    tokens: updatedGame.tokens,
  })
})

export const wager = catchAsyncError(async (req, res, next) => {
  const { wager, coinSide } = req.body
  const { userId: user_id } = req

  const game = await Game.findOne({ user_id })
  if (!game) {
    return next(new AppError('Game not found', 404))
  }

  let { tokens } = game
  if (tokens <= 0) {
    return next(new AppError('You are out of tokens', 400))
  }

  const sanitizedWager = transformWager(wager)
  if (sanitizedWager > tokens || !validateCoinSide(coinSide)) {
    return next(new AppError('Your bet exceeds tokens', 400))
  }

  tokens -= sanitizedWager

  const plays = game.plays
  let winningStreak = game.winningStreak

  const win = Math.random() >= 0.5
  let winnings = {
    payout: 0,
    bonus: null,
  }

  const status = {
    flipResult: !!win ? coinSide : getOppositeSide(coinSide),
    win,
    text: win ? 'W' : 'L',
  }

  plays.push(status)

  if (win) {
    winningStreak.push(status)
    winnings = calculateWinnings(winningStreak.length, sanitizedWager)
    if (winningStreak.length === 5) winningStreak = [] // TODO better
  } else {
    winningStreak = []
  }

  const updatedGame = await Game.findOneAndUpdate(
    { user_id },
    {
      tokens: tokens + winnings.payout,
      winningStreak,
      plays,
    },
    { new: true }
  )

  return res.status(200).json({
    tokens: updatedGame.tokens,
    lastTenPlays: updatedGame.plays.slice(-10),
    winningStreak: updatedGame.winningStreak,
    winnings,
    status,
  })
})
