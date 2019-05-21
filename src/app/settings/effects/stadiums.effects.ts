import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as stadiumsActions from '../actions/stadiums.actions';
import * as uiActions from '../../shared/ui.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Stadium, ToastrType } from 'src/app/models/models';
import { of } from 'rxjs';
import { StadiumsService } from '../services/stadiums.service';
import { StadiumsState } from '../reducers/stadiums.reducer';

@Injectable()
export class StadiumsEffects {

    @Effect() loadStadiums$ = this.actions$.pipe(
        ofType<stadiumsActions.LoadStadiums>(stadiumsActions.StadiumsActionTypes.LOAD_STADIUMS),
        switchMap(() =>  {
            return this.stadiumsService.getStadiums().pipe(
                map((response) => {
                    if (response.message === 'success') {
                        const stadiums = response.data.map(stadium => {
                            return {
                                id: stadium._id,
                                name: stadium.name,
                                address: stadium.address
                            };
                        });
                        return new stadiumsActions.StadiumsLoaded(stadiums);
                    } else {
                        return new stadiumsActions.StadiumsError({
                            title: 'Stadiums - Load Stadiums',
                            message: 'Error while loading stadiums...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new stadiumsActions.StadiumsError({
                        title: 'Stadiums - Load Stadiums',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() deleteStadium$ = this.actions$.pipe(
        ofType<stadiumsActions.DeleteStadiums>(stadiumsActions.StadiumsActionTypes.DELETE_STADIUMS),
        map(action => action.payload),
        switchMap((stadiums) => {
            return this.stadiumsService.deleteStadiums(stadiums).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new stadiumsActions.StadiumsSuccess({
                            title: 'Delete Stadiums',
                            message: 'Stadium(s) deleted successfully'
                        }));
                        return new stadiumsActions.LoadStadiums();
                    } else {
                        return new stadiumsActions.StadiumsError({
                            title: 'Stadiums - Delete Stadiums',
                            message: 'Error while deleting stadiums...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new stadiumsActions.StadiumsError({
                        title: 'Stadiums - Delete Stadiums',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() updateStadium$ = this.actions$.pipe(
        ofType<stadiumsActions.UpdateStadium>(stadiumsActions.StadiumsActionTypes.UPDATE_STADIUM),
        map(action => action.payload),
        switchMap((stadium) => {
            return this.stadiumsService.updateStadium(stadium).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new stadiumsActions.StadiumsSuccess({
                            title: 'Update Stadium',
                            message: 'Stadium updated successfully'
                        }));

                        return new stadiumsActions.LoadStadiums();
                    } else {
                        return new stadiumsActions.StadiumsError({
                            title: 'Stadiums - Update Stadium',
                            message: 'Error while updating stadium...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new stadiumsActions.StadiumsError({
                        title: 'Stadiums - Update Stadium',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() addStadium$ = this.actions$.pipe(
        ofType<stadiumsActions.AddStadium>(stadiumsActions.StadiumsActionTypes.ADD_STADIUM),
        map(action => action.payload),
        switchMap((stadium) => {
            return this.stadiumsService.addStadium(stadium).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new stadiumsActions.StadiumsSuccess({
                            title: 'Add Stadium',
                            message: 'Stadium added successfully'
                        }));

                        return new stadiumsActions.LoadStadiums();
                    } else {
                        return new stadiumsActions.StadiumsError({
                            title: 'Stadiums - Add Stadium',
                            message: 'Error while adding stadium...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new stadiumsActions.StadiumsError({
                        title: 'Stadium - Add Stadium',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() stadiumsSuccess$ = this.actions$.pipe(
        ofType<stadiumsActions.StadiumsSuccess>(stadiumsActions.StadiumsActionTypes.STADIUM_SUCCESS),
        map((action: stadiumsActions.StadiumsSuccess) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.success
            }));
        })
    );

    @Effect() stadiumsError$ = this.actions$.pipe(
        ofType<stadiumsActions.StadiumsError>(stadiumsActions.StadiumsActionTypes.STADIUM_ERROR),
        map((action: stadiumsActions.StadiumsError) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.error
            }));
        })
    );

    constructor(
        private actions$: Actions,
        public stadiumsService: StadiumsService,
        public store: Store<StadiumsState>
    ) {}
}