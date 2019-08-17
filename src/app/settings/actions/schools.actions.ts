import { Action } from '@ngrx/store';
import { School } from 'src/app/models/models';

export const enum SchoolsActionTypes {
    LOAD_SCHOOLS = '[Schools] Load Schools',
    SCHOOLS_LOADED = '[Schools] Schools Loaded',
    UPDATE_SCHOOL = '[Schools] Update School',
    ADD_SCHOOL = '[Schools] Add School',
    DELETE_SCHOOL = '[Schools] Delete School',
    SCHOOLS_SUCCESS = '[Schools] Schools Success',
    SCHOOLS_ERROR = '[Schools] Schools Error'
}

export class LoadSchools implements Action {
    readonly type = SchoolsActionTypes.LOAD_SCHOOLS;
}

export class SchoolsLoaded implements Action {
    readonly type = SchoolsActionTypes.SCHOOLS_LOADED;
    constructor(public payload: School[]) {}
}

export class UpdateSchool implements Action {
    readonly type = SchoolsActionTypes.UPDATE_SCHOOL;
    constructor(public payload: School) {}
}

export class AddSchool implements Action {
    readonly type = SchoolsActionTypes.ADD_SCHOOL;
    constructor(public payload: School) {}
}

export class DeleteSchool implements Action {
    readonly type = SchoolsActionTypes.DELETE_SCHOOL;
    constructor(public payload: string) {}
}

export class SchoolsSuccess implements Action {
    readonly type = SchoolsActionTypes.SCHOOLS_SUCCESS;
    constructor(public payload: { title: string, message: string }) {}
}

export class SchoolsError implements Action {
    readonly type = SchoolsActionTypes.SCHOOLS_ERROR;
    constructor(public payload: { title: string, message: string }) {}
}

export type SchoolsActions
    = LoadSchools
    | SchoolsLoaded
    | UpdateSchool
    | AddSchool
    | DeleteSchool
    | SchoolsSuccess
    | SchoolsError;