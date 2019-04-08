import { LoginActionTypes, LoginActions } from './login.actions';

export interface LoginState {
    authFailed: boolean;
    currentUser: string;
}

export const loginInitialState: LoginState = {
    authFailed: false,
    currentUser: null
};

export function loginReducer( state = loginInitialState, action: LoginActions): LoginState {

    switch (action.type) {

        case LoginActionTypes.LOGIN_FAILED:
            return { ...state, authFailed: action.payload };

        default:
            return state;
    }
}
