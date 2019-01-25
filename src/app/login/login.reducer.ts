import { LoginActionTypes, LoginActions } from './login.actions';

export interface LoginState {
    authFailed: boolean;
}

export const loginInitialState: LoginState = {
    authFailed: false
};

export function loginReducer( state = loginInitialState, action: LoginActions): LoginState {

    switch (action.type) {

        case LoginActionTypes.LOGIN_FAILED:
            return { ...state, authFailed: action.payload };

        default:
            return state;
    }
}
