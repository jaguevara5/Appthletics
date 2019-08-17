import { School } from 'src/app/models/models';
import { SchoolsActions, SchoolsActionTypes } from '../actions/schools.actions';

export interface SchoolsState {
    schools: School[];
}

export const schoolsInitialState: SchoolsState = {
    schools: null
};

export function schoolsReducer( state = schoolsInitialState, action: SchoolsActions): SchoolsState {

    switch (action.type) {

        case SchoolsActionTypes.LOAD_SCHOOLS:
            return { ...state };

        case SchoolsActionTypes.SCHOOLS_LOADED:
            return { ...state, schools: action.payload };

        default:
            return state;
    }
}
