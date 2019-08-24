import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as categoriesActions from '../actions/categories.actions';
import * as uiActions from '../../shared/ui.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CategoriesState } from '../reducers/categories.reducer';
import { ToastrType } from 'src/app/models/models';
import { of } from 'rxjs';
import { CategoriesService } from '../services/categories.service';

@Injectable()
export class CategoriesEffects {

    @Effect() loadCategories$ = this.actions$.pipe(
        ofType<categoriesActions.LoadCategories>(categoriesActions.CategoriesActionTypes.LOAD_CATEGORIES),
        switchMap(() =>  {
            return this.categoriesService.getCategories().pipe(
                map((response) => {
                    if (response.message === 'success') {
                        const categories = response.data;
                        return new categoriesActions.CategoriesLoaded(categories);
                    } else {
                        return new categoriesActions.CategoriesError({
                            title: 'Categories - Load Categories',
                            message: response.message
                        });
                    }
                }),
                catchError(err => {
                    return of(new categoriesActions.CategoriesError({
                        title: 'Categories - Load Categories',
                        message: err.message
                    }));
                })
            );
        })
    );


    @Effect() categoriesSuccess$ = this.actions$.pipe(
        ofType<categoriesActions.CategoriesSuccess>(categoriesActions.CategoriesActionTypes.CATEGORIES_SUCCESS),
        map((action: categoriesActions.CategoriesSuccess) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.success
            }));
        })
    );

    @Effect() CategoriesError$ = this.actions$.pipe(
        ofType<categoriesActions.CategoriesError>(categoriesActions.CategoriesActionTypes.CATEGORIES_ERROR),
        map((action: categoriesActions.CategoriesError) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.error
            }));
        })
    );

    constructor(
        private actions$: Actions,
        public categoriesService: CategoriesService,
        public store: Store<CategoriesState>
    ) {}
}