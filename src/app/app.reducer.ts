import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromSports from './settings/reducers/sports.reducer';

export interface AppState {
    ui: fromUI.UiState;
    sports:  fromSports.SportsState
}

export const initialAppState: AppState = {
    ui: fromUI.uiInitialUIState,
    sports: fromSports.sportsInitialState
};

export const appReducers: ActionReducerMap<AppState, any> = {
    ui: fromUI.uiReducer,
    sports: fromSports.sportsReducer
};

export const selectSport = (state: AppState) => state.sports;

export const selectSportsList = createSelector(
    selectSport, 
    (state: fromSports.SportsState) => state.sports
);
