import { Team } from 'src/app/models/models';
import { TeamsActions, TeamsActionTypes } from '../actions/teams.actions';

export interface TeamsState {
    teams: Team[];
}

export const teamsInitialState: TeamsState = {
    teams: null
};

export function teamsReducer( state = teamsInitialState, action: TeamsActions): TeamsState {

    switch (action.type) {

        case TeamsActionTypes.LOAD_TEAMS:
            return { ...state };

        case TeamsActionTypes.TEAMS_LOADED:
            return { ...state, teams: action.payload };

        default:
            return state;
    }
}
