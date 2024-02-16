import { LOGIN, LOGOUT } from '../constants/actionTypes';

interface Action {
    type: typeof LOGIN | typeof LOGOUT;
    token: string | null;
}

export interface AuthState {
    token: string | null;
}

const initialState: AuthState = { token: null };

// reducers should only return new state
// reducers should never create side effects
const authReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case LOGIN:
            return { token: action?.token };

        case LOGOUT:
            return { token: null };

        default:
            return state;
    }
};
export default authReducer;
