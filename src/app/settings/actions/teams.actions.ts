import { Action } from '@ngrx/store';
import { Team, TeamsQueryParams } from 'src/app/models/models';

export const enum TeamsActionTypes {
    LOAD_TEAMS = '[Teams] Load Teams',
    TEAMS_LOADED = '[Teams] Teams Loaded',
    UPDATE_TEAM = '[Teams] Update Team',
    ADD_TEAM = '[Teams] Add Team',
    DELETE_TEAM = '[Teams] Delete Team',
    TEAMS_SUCCESS = '[Teams] Teams Success',
    TEAMS_ERROR = '[Teams] Teams Error'
}

export class LoadTeams implements Action {
    readonly type = TeamsActionTypes.LOAD_TEAMS;
    constructor(public payload: TeamsQueryParams) {}
}

export class TeamsLoaded implements Action {
    readonly type = TeamsActionTypes.TEAMS_LOADED;
    constructor(public payload: Team[]) {}
}

export class UpdateTeam implements Action {
    readonly type = TeamsActionTypes.UPDATE_TEAM;
    constructor(public payload: Team) {}
}

export class AddTeam implements Action {
    readonly type = TeamsActionTypes.ADD_TEAM;
    constructor(public payload: Team) {}
}

export class DeleteTeam implements Action {
    readonly type = TeamsActionTypes.DELETE_TEAM;
    constructor(public payload: Team) {}
}

export class TeamsSuccess implements Action {
    readonly type = TeamsActionTypes.TEAMS_SUCCESS;
    constructor(public payload: { title: string, message: string }) {}
}

export class TeamsError implements Action {
    readonly type = TeamsActionTypes.TEAMS_ERROR;
    constructor(public payload: { title: string, message: string }) {}
}

export type TeamsActions
    = LoadTeams
    | TeamsLoaded
    | UpdateTeam
    | AddTeam
    | DeleteTeam
    | TeamsSuccess
    | TeamsError;