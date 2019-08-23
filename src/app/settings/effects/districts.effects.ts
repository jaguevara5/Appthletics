import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as districtsActions from '../actions/districts.actions';
import * as uiActions from '../../shared/ui.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DistrictsService } from '../services/districts.service';
import { Store } from '@ngrx/store';
import { DistrictsState } from '../reducers/districts.reducer';
import { ToastrType } from 'src/app/models/models';
import { of } from 'rxjs';

@Injectable()
export class DistrictsEffects {

    @Effect() loadDistricts$ = this.actions$.pipe(
        ofType<districtsActions.LoadDistricts>(districtsActions.DistrictsActionTypes.LOAD_DISTRICTS),
        switchMap(() =>  {
            return this.districtsService.getDistricts().pipe(
                map((response) => {
                    if (response.message === 'success') {
                        const districts = response.data;
                        return new districtsActions.DistrictsLoaded(districts);
                    } else {
                        return new districtsActions.DistrictsError({
                            title: 'Districts - Load Districts',
                            message: 'Error while loading...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new districtsActions.DistrictsError({
                        title: 'Districts - Load Districts',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() updateDistrict$ = this.actions$.pipe(
        ofType<districtsActions.UpdateDistrict>(districtsActions.DistrictsActionTypes.UPDATE_DISTRICT),
        map(action => action.payload),
        switchMap((district) => {
            return this.districtsService.updateDistrict(district).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new districtsActions.DistrictsSuccess({
                            title: 'Update District',
                            message: 'District updated successfully'
                        }));

                        return new districtsActions.LoadDistricts();
                    } else {
                        return new districtsActions.DistrictsError({
                            title: 'Districts - Update District',
                            message: 'Error while updating district...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new districtsActions.DistrictsError({
                        title: 'District - Update District',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() addDistrict$ = this.actions$.pipe(
        ofType<districtsActions.AddDistrict>(districtsActions.DistrictsActionTypes.ADD_DISTRICT),
        map(action => action.payload),
        switchMap((name) => {
            return this.districtsService.addDistrict(name).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new districtsActions.DistrictsSuccess({
                            title: 'Add District',
                            message: 'District added successfully'
                        }));

                        return new districtsActions.LoadDistricts();
                    } else {
                        return new districtsActions.DistrictsError({
                            title: 'Districts - Add District',
                            message: 'Error while adding district...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new districtsActions.DistrictsError({
                        title: 'Districts - Add District',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() deleteDistrict$ = this.actions$.pipe(
        ofType<districtsActions.DeleteDistrict>(districtsActions.DistrictsActionTypes.DELETE_DISTRICT),
        map(action => action.payload),
        switchMap((district) => {
            return this.districtsService.deleteDistrict(district).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new districtsActions.DistrictsSuccess({
                            title: 'Delete District',
                            message: 'District deleted successfully'
                        }));
                        return new districtsActions.LoadDistricts();
                    } else {
                        return new districtsActions.DistrictsError({
                            title: 'Districts - Delete District',
                            message: 'Error while deleting district...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new districtsActions.DistrictsError({
                        title: 'District - Delete District',
                        message: err.message
                    }));
                })
            );
        })
    );


    @Effect() districtsSuccess$ = this.actions$.pipe(
        ofType<districtsActions.DistrictsSuccess>(districtsActions.DistrictsActionTypes.DISTRICTS_SUCCESS),
        map((action: districtsActions.DistrictsSuccess) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.success
            }));
        })
    );

    @Effect() districtsError$ = this.actions$.pipe(
        ofType<districtsActions.DistrictsError>(districtsActions.DistrictsActionTypes.DISTRICTS_ERROR),
        map((action: districtsActions.DistrictsError) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.error
            }));
        })
    );

    constructor(
        private actions$: Actions,
        public districtsService: DistrictsService,
        public store: Store<DistrictsState>
    ) {}
}