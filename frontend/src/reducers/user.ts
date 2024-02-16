import { SET_USER } from '../constants/actionTypes';

export interface User {
    _id: string;
    name: string;
    email: string;
    exp: number;
    iat: number;
    password: string;
}

export interface UserState {
    user: User | null;
}

const initialState: UserState = { user: null };

interface UserAction {
    type: typeof SET_USER;
    user: User | null;
}

const userReducer = (state = initialState, action: UserAction) => {
    switch (action.type) {
        case SET_USER:
            return {
                user: action.user
                    ? {
                          ...action.user,
                      }
                    : null,
            };

        default:
            return state;
    }
};

export default userReducer;
