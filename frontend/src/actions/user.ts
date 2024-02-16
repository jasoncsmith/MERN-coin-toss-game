import { Dispatch } from 'redux';
import messages from '../messages';
import { SET_USER } from '../constants/actionTypes';
import { User } from '../reducers/user';

export const setUser = (data: User) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: SET_USER, data });
    } catch (error) {
        messages.error('could not set user');
    }
};
