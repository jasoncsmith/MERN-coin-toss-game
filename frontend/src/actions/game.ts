import { Dispatch } from 'redux';
import { SET_GAME, REFILIL_TOKENS, WAGER } from '../constants/actionTypes';
import {
    submitWager,
    getGame as apiGetGame,
    refillTokens as apiRefillTokens,
} from '../api';
import { WagerFormData } from '../components/Game';
import messages from '../messages';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong.';

export const wager =
    (formData: WagerFormData) => async (dispatch: Dispatch) => {
        try {
            const { data } = await submitWager(formData);

            dispatch({ type: WAGER, data });

            const { status, winnings } = data;

            if (status?.win === true) {
                messages.success(
                    `You won!${
                        !!winnings.bonus
                            ? ` ${winnings.bonus} multiplier bonus!`
                            : ''
                    }`
                );
            } else {
                messages.info('You lost, try again.');
            }
        } catch (error: any) {
            messages.error(
                error?.response?.data.message || DEFAULT_ERROR_MESSAGE
            );
        }
    };

export const getGame = () => async (dispatch: Dispatch) => {
    try {
        const { data } = await apiGetGame();

        dispatch({ type: SET_GAME, data });
    } catch (error: any) {
        messages.error(error?.response?.data.message || DEFAULT_ERROR_MESSAGE);
    }
};

export const refillTokens = () => async (dispatch: Dispatch) => {
    try {
        const { data } = await apiRefillTokens();

        dispatch({ type: REFILIL_TOKENS, data });
    } catch (error: any) {
        messages.error((error.response.data.message = DEFAULT_ERROR_MESSAGE));
    }
};
