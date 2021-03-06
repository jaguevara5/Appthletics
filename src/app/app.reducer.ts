import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromLogin from './login/login.reducer';
import * as fromSports from './settings/reducers/sports.reducer';
import * as fromUsers from './settings/reducers/users.reducer';
import * as fromStadiums from './settings/reducers/stadiums.reducer';
import * as fromDistricts from './settings/reducers/districts.reducer';
import * as fromSchools from './settings/reducers/schools.reducer';
import * as fromTeams from './settings/reducers/teams.reducer';
import * as fromCategories from './settings/reducers/categories.reducer';

export interface AppState {
    ui: fromUI.UiState;
    login: fromLogin.LoginState;
    users: fromUsers.UsersState;
    sports:  fromSports.SportsState;
    stadiums: fromStadiums.StadiumsState;
    districts: fromDistricts.DistrictsState;
    schools: fromSchools.SchoolsState;
    teams: fromTeams.TeamsState;
    categories: fromCategories.CategoriesState;
}

export const initialAppState: AppState = {
    ui: fromUI.uiInitialUIState,
    login: fromLogin.loginInitialState,
    users: fromUsers.usersInitialState,
    sports: fromSports.sportsInitialState,
    stadiums: fromStadiums.stadiumsInitialState,
    districts: fromDistricts.districtsInitialState,
    schools: fromSchools.schoolsInitialState,
    teams: fromTeams.teamsInitialState,
    categories: fromCategories.categoriesInitialState
};

export const appReducers: ActionReducerMap<AppState, any> = {
    ui: fromUI.uiReducer,
    login: fromLogin.loginReducer,
    users: fromUsers.usersReducer,
    sports: fromSports.sportsReducer,
    stadiums: fromStadiums.stadiumsReducer,
    districts: fromDistricts.districtsReducer,
    schools: fromSchools.schoolsReducer,
    teams: fromTeams.teamsReducer,
    categories: fromCategories.categoriesReducer
};

export const selectLogin = (state: AppState) => state.login;
export const selectSport = (state: AppState) => state.sports;
export const selectUser = (state: AppState) => state.users;
export const selectStadium = (state: AppState) => state.stadiums;
export const selectDistrict = (state: AppState) => state.districts;
export const selectSchool = (state: AppState) => state.schools;
export const selectTeam = (state: AppState) => state.teams;
export const selectCategory = (state: AppState) => state.categories;

export const selectAuthFailed = createSelector(
    selectLogin,
    (state: fromLogin.LoginState) => state.authFailed
);

export const selectCurrentUser = createSelector(
    selectLogin,
    (state: fromLogin.LoginState) => state.currentUser
);

export const selectSportsList = createSelector(
    selectSport,
    (state: fromSports.SportsState) => state.sports
);

export const selectUsersList = createSelector(
    selectUser,
    (state: fromUsers.UsersState) => state.users
);

export const selectStadiumsList = createSelector(
    selectStadium,
    (state: fromStadiums.StadiumsState) => state.stadiums
);

export const selectDistrictsList = createSelector(
    selectDistrict,
    (state: fromDistricts.DistrictsState) => state.districts
);

export const selectSchoolsList = createSelector(
    selectSchool,
    (state: fromSchools.SchoolsState) => state.schools
);

export const selectTeamsList = createSelector(
    selectTeam,
    (state: fromTeams.TeamsState) => state.teams
);

export const selectCategoriesList = createSelector(
    selectCategory,
    (state: fromCategories.CategoriesState) => state.categories
);
