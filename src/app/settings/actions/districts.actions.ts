import { Action } from '@ngrx/store';
import { District } from 'src/app/models/models';

export const enum DistrictsActionTypes {
    LOAD_DISTRICTS = '[Districts] Load Districts',
    DISTRICTS_LOADED = '[Districts] Districts Loaded',
    UPDATE_DISTRICT = '[Districts] Update District',
    ADD_DISTRICT = '[Districts] Add District',
    DELETE_DISTRICT = '[Districts] Delete District',
    DISTRICTS_SUCCESS = '[Districts] Districts Success',
    DISTRICTS_ERROR = '[Districts] Districts Error'
}

export class LoadDistricts implements Action {
    readonly type = DistrictsActionTypes.LOAD_DISTRICTS;
}

export class DistrictsLoaded implements Action {
    readonly type = DistrictsActionTypes.DISTRICTS_LOADED;
    constructor(public payload: District[]) {}
}

export class UpdateDistrict implements Action {
    readonly type = DistrictsActionTypes.UPDATE_DISTRICT;
    constructor(public payload: District) {}
}

export class AddDistrict implements Action {
    readonly type = DistrictsActionTypes.ADD_DISTRICT;
    constructor(public payload: string) {}
}

export class DeleteDistrict implements Action {
    readonly type = DistrictsActionTypes.DELETE_DISTRICT;
    constructor(public payload: string) {}
}

export class DistrictsSuccess implements Action {
    readonly type = DistrictsActionTypes.DISTRICTS_SUCCESS;
    constructor(public payload: { title: string, message: string }) {}
}

export class DistrictsError implements Action {
    readonly type = DistrictsActionTypes.DISTRICTS_ERROR;
    constructor(public payload: { title: string, message: string }) {}
}

export type DistrictsActions
    = LoadDistricts
    | DistrictsLoaded
    | UpdateDistrict
    | AddDistrict
    | DeleteDistrict
    | DistrictsSuccess
    | DistrictsError;