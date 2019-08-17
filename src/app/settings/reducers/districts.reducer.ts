import { District } from 'src/app/models/models';
import { DistrictsActions, DistrictsActionTypes } from '../actions/districts.actions';

export interface DistrictsState {
    districts: District[];
}

export const districtsInitialState: DistrictsState = {
    districts: null
};

export function districtsReducer( state = districtsInitialState, action: DistrictsActions): DistrictsState {

    switch (action.type) {

        case DistrictsActionTypes.LOAD_DISTRICTS:
            return { ...state };

        case DistrictsActionTypes.DISTRICTS_LOADED:
            return { ...state, districts: action.payload };

        default:
            return state;
    }
}
