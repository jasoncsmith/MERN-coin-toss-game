import { Dispatch } from 'redux';
import { jwtDecode } from 'jwt-decode';

import { LOGIN, LOGOUT, SET_USER } from '../constants/actionTypes';
import { GAME_ROUTE } from '../constants/routes';
import * as api from '../api';
import messages from '../messages';
import { navigationProxy } from '../helpers/navigationProxy';
import { User } from '../reducers/user';

export interface SignUpFormData {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export const signup =
    (formData: SignUpFormData) => async (dispatch: Dispatch) => {
        try {
            const { data } = await api.signUp(formData);

            const user: User = jwtDecode(data.token);

            dispatch({ type: LOGIN, token: data.token });
            dispatch({ type: SET_USER, user });
            navigationProxy.navigate?.(GAME_ROUTE);

            messages.success(`Welcome, ${user.name}!`);
        } catch (error: any) {
            messages.error(error?.response?.data.message);
        }
    };

export const login =
    (formData: SignUpFormData) => async (dispatch: Dispatch) => {
        try {
            const { data } = await api.login(formData);
            const user: User = jwtDecode(data.token);
            dispatch({ type: LOGIN, token: data.token });
            dispatch({ type: SET_USER, user });

            navigationProxy.navigate?.(GAME_ROUTE);

            messages.success(`Welcome, ${user.name}!`);
        } catch (error: any) {
            messages.error(error?.response?.data.message);
        }
    };

export const logout = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: SET_USER, user: null });
        dispatch({ type: LOGOUT, token: null });

        navigationProxy.navigate?.('/auth');
    } catch (error: any) {
        messages.error('Error logging out user');
    }
};
