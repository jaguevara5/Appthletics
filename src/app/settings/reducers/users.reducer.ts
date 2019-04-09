import { User } from '../models/user';
import { UsersActions, UsersActionTypes } from '../actions/users.actions';


export interface UsersState {
    users: User[];
}

export const usersInitialState: UsersState = {
    users: null
};

export function usersReducer( state = usersInitialState, action: UsersActions): UsersState {

    switch (action.type) {

        case UsersActionTypes.LOAD_USERS:
            return { ...state };

        case UsersActionTypes.USERS_LOADED:
            return { ...state, users: action.payload };

        default:
            return state;
    }
}
