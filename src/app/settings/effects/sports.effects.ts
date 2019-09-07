import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as sportsActions from '../actions/sports.actions';
import * as uiActions from '../../shared/ui.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { SportsService } from '../services/sports.service';
import { Store } from '@ngrx/store';
import { SportsState } from '../reducers/sports.reducer';
import { Sport, ToastrType } from 'src/app/models/models';
import { of } from 'rxjs';

@Injectable()
export class SportsEffects {

    @Effect() loadSports$ = this.actions$.pipe(
        ofType<sportsActions.LoadSports>(sportsActions.SportsActionTypes.LOAD_SPORTS),
        switchMap(() =>  {
            return this.sportsService.getSports().pipe(
                map((response) => {
                    if (response.message === 'success') {
                        const sports = response.data;
                        return new sportsActions.SportsLoaded(sports);
                    } else {
                        return new sportsActions.SportsError({
                            title: 'Sports - Load Sports',
                            message: 'Error while loading...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new sportsActions.SportsError({
                        title: 'Sports - Load Sports',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() deleteSport$ = this.actions$.pipe(
        ofType<sportsActions.DeleteSport>(sportsActions.SportsActionTypes.DELETE_SPORT),
        map(action => action.payload),
        switchMap((sport) => {
            return this.sportsService.deleteSport(sport).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new sportsActions.SportsSuccess({
                            title: 'Delete Sport',
                            message: 'Sport deleted successfully'
                        }));
                        return new sportsActions.LoadSports();
                    } else {
                        return new sportsActions.SportsError({
                            title: 'Sport - Delete Sport',
                            message: 'Error while deleting sports...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new sportsActions.SportsError({
                        title: 'Sport - Delete Sport',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() updateSport$ = this.actions$.pipe(
        ofType<sportsActions.UpdateSport>(sportsActions.SportsActionTypes.UPDATE_SPORT),
        map(action => action.payload),
        switchMap((sport) => {
            return this.sportsService.updateSport(sport).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new sportsActions.SportsSuccess({
                            title: 'Update Sport',
                            message: 'Sport updated successfully'
                        }));

                        return new sportsActions.LoadSports();
                    } else {
                        return new sportsActions.SportsError({
                            title: 'Sports - Update Sport',
                            message: 'Error while updating sport...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new sportsActions.SportsError({
                        title: 'Sports - Update Sport',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() addSport$ = this.actions$.pipe(
        ofType<sportsActions.AddSport>(sportsActions.SportsActionTypes.ADD_SPORT),
        map(action => action.payload),
        switchMap((name) => {
            return this.sportsService.addSport(name).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new sportsActions.SportsSuccess({
                            title: 'Add Sport',
                            message: 'Sport added successfully'
                        }));

                        return new sportsActions.LoadSports();
                    } else {
                        return new sportsActions.SportsError({
                            title: 'Sports - Add Sport',
                            message: 'Error while adding sport...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new sportsActions.SportsError({
                        title: 'Sports - Add Sport',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() sportsSuccess$ = this.actions$.pipe(
        ofType<sportsActions.SportsSuccess>(sportsActions.SportsActionTypes.SPORTS_SUCCESS),
        map((action: sportsActions.SportsSuccess) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.success
            }));
        })
    );

    @Effect() sportsError$ = this.actions$.pipe(
        ofType<sportsActions.SportsError>(sportsActions.SportsActionTypes.SPORTS_ERROR),
        map((action: sportsActions.SportsError) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.error
            }));
        })
    );

    constructor(
        private actions$: Actions,
        public sportsService: SportsService,
        public store: Store<SportsState>
    ) {}
}
