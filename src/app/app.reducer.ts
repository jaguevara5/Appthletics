import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromLogin from './login/login.reducer';
import * as fromSports from './settings/reducers/sports.reducer';

export interface AppState {
    ui: fromUI.UiState;
    login: fromLogin.LoginState;
    sports:  fromSports.SportsState;
}

export const initialAppState: AppState = {
    ui: fromUI.uiInitialUIState,
    login: fromLogin.loginInitialState,
    sports: fromSports.sportsInitialState
};

export const appReducers: ActionReducerMap<AppState, any> = {
    ui: fromUI.uiReducer,
    login: fromLogin.loginReducer,
    sports: fromSports.sportsReducer
};

export const selectLogin = (state: AppState) => state.login;
export const selectSport = (state: AppState) => state.sports;

export const selectAuthFailed = createSelector(
    selectLogin,
    (state: fromLogin.LoginState) => state.authFailed
);

export const selectSportsList = createSelector(
    selectSport,
    (state: fromSports.SportsState) => state.sports
);
