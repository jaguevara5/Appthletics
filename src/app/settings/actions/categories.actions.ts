import { Action } from '@ngrx/store';
import { Category } from 'src/app/models/models';

export const enum CategoriesActionTypes {
    LOAD_CATEGORIES = '[Categories] Load Categories',
    CATEGORIES_LOADED = '[Categories] Categories Loaded',
    CATEGORIES_SUCCESS = '[Categories] Categories Success',
    CATEGORIES_ERROR = '[Categories] Categories Error'
}

export class LoadCategories implements Action {
    readonly type = CategoriesActionTypes.LOAD_CATEGORIES;
}

export class CategoriesLoaded implements Action {
    readonly type = CategoriesActionTypes.CATEGORIES_LOADED;
    constructor(public payload: Category[]) {}
}

export class CategoriesSuccess implements Action {
    readonly type = CategoriesActionTypes.CATEGORIES_SUCCESS;
    constructor(public payload: { title: string, message: string }) {}
}

export class CategoriesError implements Action {
    readonly type = CategoriesActionTypes.CATEGORIES_ERROR;
    constructor(public payload: { title: string, message: string }) {}
}

export type CategoriesActions
    = LoadCategories
    | CategoriesLoaded
    | CategoriesSuccess
    | CategoriesError;