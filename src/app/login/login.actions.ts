import { Action } from '@ngrx/store';
import { User } from '../models/models';

export const enum LoginActionTypes {
    USER_LOGIN= '[Login] User logging in...',
    LOGIN_SUCCESS = '[Login] Login success',
    USER_LOGOUT = '[Login] User logout'
}

export class UserLoginAction implements Action {
    readonly type = LoginActionTypes.USER_LOGIN;
    constructor(public payload: User) {}
}

export class LoginSuccess implements Action {
    readonly type = LoginActionTypes.LOGIN_SUCCESS;
}

export class UserLogout implements Action {
    readonly type = LoginActionTypes.USER_LOGOUT;
}

export type LoginActions
    = UserLoginAction
    | LoginSuccess
    | UserLogout;
