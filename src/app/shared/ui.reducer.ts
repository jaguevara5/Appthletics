import * as fromUI from './ui.actions';

export interface UiState {
    isLoading: boolean;
}

export const uiInitialUIState: UiState = {
    isLoading: false
};

export function uiReducer( state = uiInitialUIState, action: fromUI.actions ): UiState {

    switch ( action.type ) {

        case fromUI.LOADING_STARTED:
            return {
                isLoading: true
            };

        case fromUI.LOADING_FINISHED:
            return {
                isLoading: false
            };

        default:
            return state;
    }
}
