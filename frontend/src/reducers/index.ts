import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import game, { GameState } from './game';
import user, { UserState } from './user';

export interface ReduxState {
    game: GameState;
    auth: AuthState;
    user: UserState;
}

export type AppDispatch = ThunkDispatch<ReduxState, any, Action>;

export default combineReducers({
    auth,
    game,
    user,
});
