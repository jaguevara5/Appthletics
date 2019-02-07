import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromLogin from './login/login.reducer';
import * as fromSports from './settings/reducers/sports.reducer';
import * as fromUsers from './settings/reducers/users.reducer';

export interface AppState {
    ui: fromUI.UiState;
    login: fromLogin.LoginState;
    users: fromUsers.UsersState;
    sports:  fromSports.SportsState;
}

export const initialAppState: AppState = {
    ui: fromUI.uiInitialUIState,
    login: fromLogin.loginInitialState,
    users: fromUsers.usersInitialState,
    sports: fromSports.sportsInitialState
};

export const appReducers: ActionReducerMap<AppState, any> = {
    ui: fromUI.uiReducer,
    login: fromLogin.loginReducer,
    users: fromUsers.usersReducer,
    sports: fromSports.sportsReducer
};

export const selectLogin = (state: AppState) => state.login;
export const selectSport = (state: AppState) => state.sports;
export const selectUser = (state: AppState) => state.users;

export const selectAuthFailed = createSelector(
    selectLogin,
    (state: fromLogin.LoginState) => state.authFailed
);

export const selectSportsList = createSelector(
    selectSport,
    (state: fromSports.SportsState) => state.sports
);

export const selectUsersList = createSelector(
    selectUser,
    (state: fromUsers.UsersState) => state.users
);
