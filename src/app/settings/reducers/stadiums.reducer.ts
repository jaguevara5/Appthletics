import { Stadium } from 'src/app/models/models';
import { StadiumsActions, StadiumsActionTypes } from '../actions/stadiums.actions';

export interface StadiumsState {
    stadiums: Stadium[];
}

export const stadiumsInitialState: StadiumsState = {
    stadiums: null
};

export function stadiumsReducer( state = stadiumsInitialState, action: StadiumsActions): StadiumsState {

    switch (action.type) {

        case StadiumsActionTypes.LOAD_STADIUMS:
            return { ...state };

        case StadiumsActionTypes.STADIUMS_LOADED:
            return { ...state, stadiums: action.payload };

        default:
            return state;
    }
}
