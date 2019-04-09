import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const enum UsersActionTypes {
    LOAD_USERS = '[Users] Load Users',
    USERS_LOADED = '[Users] Users Loaded',
    CREATE_USER = '[Users] Create User',
    DELETE_USERS = '[Users] Delete Users',
    UPDATE_USER = '[Users] Update User',
    USERS_SUCCESS = '[Users] Users Success',
    USERS_ERROR = '[Users] Users Error'
}

export class LoadUsers implements Action {
    readonly type = UsersActionTypes.LOAD_USERS;
}

export class UsersLoaded implements Action {
    readonly type = UsersActionTypes.USERS_LOADED;
    constructor(public payload: User[]) {}
}

export class CreateUser implements Action {
    readonly type = UsersActionTypes.CREATE_USER;
    constructor(public payload: User) {}
}

export class DeleteUsers implements Action {
    readonly type = UsersActionTypes.DELETE_USERS;
    constructor(public payload: string[]) {}
}

export class UpdateUser implements Action {
    readonly type = UsersActionTypes.UPDATE_USER;
    constructor(public payload: User) {}
}

export class UsersSuccess implements Action {
    readonly type = UsersActionTypes.USERS_SUCCESS;
    constructor(public payload: { title: string, message: string }) {}
}

export class UsersError implements Action {
    readonly type = UsersActionTypes.USERS_ERROR;
    constructor(public payload: { title: string, message: string }) {}
}

export type UsersActions
    = LoadUsers
    | UsersLoaded
    | CreateUser
    | UpdateUser
    | UsersSuccess
    | UsersError
    | DeleteUsers;
