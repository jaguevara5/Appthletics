import { Category } from 'src/app/models/models';
import { CategoriesActions, CategoriesActionTypes } from '../actions/categories.actions';

export interface CategoriesState {
    categories: Category[];
}

export const categoriesInitialState: CategoriesState = {
    categories: null
};

export function categoriesReducer( state = categoriesInitialState, action: CategoriesActions): CategoriesState {

    switch (action.type) {

        case CategoriesActionTypes.LOAD_CATEGORIES:
            return { ...state };

        case CategoriesActionTypes.CATEGORIES_LOADED:
            return { ...state, categories: action.payload };

        default:
            return state;
    }
}
