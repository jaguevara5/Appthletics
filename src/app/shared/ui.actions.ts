import { Action } from '@ngrx/store';
import { ToastrType } from '../models/models';

export const enum UIActionTypes {
    LOADING_STARTED = '[UI] Loading...',
    LOADING_FINISHED = '[UI] Loading finished...',
    SHOW_TOASTR = '[UI Show Toastr]'
}

export class LoadingStartedAction implements Action {
    readonly type = UIActionTypes.LOADING_STARTED;
}

export class LoadingFinishedAction implements Action {
    readonly type = UIActionTypes.LOADING_FINISHED;
}

export class ShowToastr implements Action {
    readonly type = UIActionTypes.SHOW_TOASTR;
    constructor(public payload: { title: string; body: string, type: ToastrType }) {}
}

export type actions
    = LoadingStartedAction
    | LoadingFinishedAction
    | ShowToastr;
