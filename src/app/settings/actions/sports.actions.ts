import { Action } from '@ngrx/store';
import { Sport } from 'src/app/models/models';

export const enum SportsActionTypes {
    LOAD_SPORTS = '[Sports] Load Sports',
    SPORTS_LOADED = '[Sports] Sports Loaded',
    DELETE_SPORTS = '[Sports] Delete Sports',
    UPDATE_SPORT = '[Sports] Update Sport',
    ADD_SPORT = '[Sports] Add Sport',
    SPORTS_SUCCESS = '[Sports] Sports Success',
    SPORTS_ERROR = '[Sports] Sports Error'
}

export class LoadSports implements Action {
    readonly type = SportsActionTypes.LOAD_SPORTS;
}

export class SportsLoaded implements Action {
    readonly type = SportsActionTypes.SPORTS_LOADED;
    constructor(public payload: Sport[]) {}
}

export class DeleteSports implements Action {
    readonly type = SportsActionTypes.DELETE_SPORTS;
    constructor(public payload: string[]) {}
}

export class UpdateSport implements Action {
    readonly type = SportsActionTypes.UPDATE_SPORT;
    constructor(public payload: Sport) {}
}

export class AddSport implements Action {
    readonly type = SportsActionTypes.ADD_SPORT;
    constructor(public payload: string) {}
}

export class SportsSuccess implements Action {
    readonly type = SportsActionTypes.SPORTS_SUCCESS;
    constructor(public payload: { title: string, message: string }) {}
}

export class SportsError implements Action {
    readonly type = SportsActionTypes.SPORTS_ERROR;
    constructor(public payload: { title: string, message: string }) {}
}

export type SportsActions
    = LoadSports
    | SportsLoaded
    | DeleteSports
    | UpdateSport
    | AddSport
    | SportsSuccess
    | SportsError;