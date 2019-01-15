import { Action } from '@ngrx/store';


export const LOADING_STARTED = '[UI Loading] Loading...';
export const LOADING_FINISHED = '[UI Loading] Loading finished...';

export class LoadingStartedAction implements Action {
    readonly type = LOADING_STARTED;
}

export class LoadingFinishedAction implements Action {
    readonly type = LOADING_FINISHED;
}

export type actions
    = LoadingStartedAction 
    | LoadingFinishedAction;