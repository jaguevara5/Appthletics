import { Sport } from 'src/app/models/models';
import { SportsActions, SportsActionTypes } from '../actions/sports.actions';

export interface SportsState {
    sports: Sport[];
}

export const sportsInitialState: SportsState = {
    sports: null
};

export function sportsReducer( state = sportsInitialState, action: SportsActions): SportsState {

    switch (action.type) {

        case SportsActionTypes.LOAD_SPORTS:
            return { ...state };

        case SportsActionTypes.SPORTS_LOADED:
            return { ...state, sports: action.payload };

        default:
            return state;
    }
};

