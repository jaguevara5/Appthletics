import { Action } from '@ngrx/store';
import { Stadium } from 'src/app/models/models';

export const enum StadiumsActionTypes {
    LOAD_STADIUMS = '[Stadiums] Load Stadiums',
    STADIUMS_LOADED = '[Stadiums] Stadiums Loaded',
    DELETE_STADIUMS = '[Stadiums] Delete Stadiums',
    UPDATE_STADIUM = '[Stadiums] Update Stadium',
    ADD_STADIUM = '[Stadiums] Add Stadium',
    STADIUM_SUCCESS = '[Stadiums] Stadiums Success',
    STADIUM_ERROR = '[Stadiums] Stadiums Error'
}

export class LoadStadiums implements Action {
    readonly type = StadiumsActionTypes.LOAD_STADIUMS;
}

export class StadiumsLoaded implements Action {
    readonly type = StadiumsActionTypes.STADIUMS_LOADED;
    constructor(public payload: Stadium[]) {}
}

export class DeleteStadiums implements Action {
    readonly type = StadiumsActionTypes.DELETE_STADIUMS;
    constructor(public payload: string[]) {}
}

export class UpdateStadium implements Action {
    readonly type = StadiumsActionTypes.UPDATE_STADIUM;
    constructor(public payload: Stadium) {}
}

export class AddStadium implements Action {
    readonly type = StadiumsActionTypes.ADD_STADIUM;
    constructor(public payload: Stadium) {}
}

export class StadiumsSuccess implements Action {
    readonly type = StadiumsActionTypes.STADIUM_SUCCESS;
    constructor(public payload: { title: string, message: string }) {}
}

export class StadiumsError implements Action {
    readonly type = StadiumsActionTypes.STADIUM_ERROR;
    constructor(public payload: { title: string, message: string }) {}
}

export type StadiumsActions
    = LoadStadiums
    | StadiumsLoaded
    | DeleteStadiums
    | UpdateStadium
    | AddStadium
    | StadiumsSuccess
    | StadiumsError;
