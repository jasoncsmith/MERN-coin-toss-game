import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { GAME_ROUTE } from '../../../../constants/routes';
import { ReduxState } from '../../../../reducers';
import { GameState } from '../../../../reducers/game';
import { UserState } from '../../../../reducers/user';

import WinningStreak from '../WinningStreak';
import GameHistory from '../GameHistory';
import Tokens from '../Tokens';

export default function GameHud() {
    const {
        tokens = 0,
        lastTenPlays,
        winningStreak,
    }: GameState = useSelector((state: ReduxState) => state.game);
    const { user }: UserState = useSelector((state: ReduxState) => state.user);

    const { pathname } = useLocation();

    return user && pathname === GAME_ROUTE ? (
        <div>
            <Tokens tokens={tokens} />
            <GameHistory items={lastTenPlays} />
            <WinningStreak items={winningStreak} />
        </div>
    ) : null;
}
