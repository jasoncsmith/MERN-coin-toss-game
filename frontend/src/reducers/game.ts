import { SET_GAME, REFILIL_TOKENS, WAGER } from '../constants/actionTypes';

interface Winnings {
    payout: number;
    bonus: boolean;
}

export interface Status {
    flipResult: 'Heads' | 'Tails';
    win: boolean;
    text: 'W' | 'L';
}

export interface GameState {
    tokens: number;
    lastTenPlays: Status[];
    winningStreak: Status[];
    status: Status;
    winnings: Winnings;
}

interface Action {
    type: typeof SET_GAME | typeof REFILIL_TOKENS | typeof WAGER;
    data: GameState;
}

const initialState: GameState = {
    tokens: 0,
    lastTenPlays: [],
    winningStreak: [],
    status: {} as Status,
    winnings: {
        payout: 0,
        bonus: false,
    },
};

const gameReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case WAGER:
            return {
                ...action.data,
            };

        case SET_GAME:
            return {
                ...action.data,
            };

        case REFILIL_TOKENS:
            return {
                ...state,
                tokens: action.data?.tokens,
            };

        default:
            return state;
    }
};

export default gameReducer;
