import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as sportsActions from '../actions/sports.actions';
import { map, switchMap } from 'rxjs/operators';
import { SportsService } from '../services/sports.service';
import { Store } from '@ngrx/store';
import { SportsState } from '../reducers/sports.reducer';
import { Sport } from 'src/app/models/models';
import { of } from 'rxjs';

@Injectable()
export class SportsEffects {

    @Effect() loadSports$ = this.actions$.pipe(
        ofType<sportsActions.LoadSports>(sportsActions.SportsActionTypes.LOAD_SPORTS),
        switchMap(() =>  {
            return this.sportsService.getSports();
        }),
        switchMap((response: any) => {
            if (response.message === 'success') {
                const sports = response.data.map(sport => {
                    return {
                        id: sport._id,
                        name: sport.name
                    };
                });
                return of(new sportsActions.SportsLoaded(sports));
            } else {
                console.log('Error - Delete Sports');
            }
        })
    );

    @Effect() deleteSport$ = this.actions$.pipe(
        ofType<sportsActions.DeleteSports>(sportsActions.SportsActionTypes.DELETE_SPORTS),
        map(action => action.payload),
        switchMap((sports) => {
            return this.sportsService.deleteSports(sports);
        }),
        switchMap((response: any) => {
            if (response.message === 'success') {
                return of(new sportsActions.LoadSports())
            } else {
                console.log('Error - Delete Sports');
            }
        })
    );

    @Effect() updateSport$ = this.actions$.pipe(
        ofType<sportsActions.UpdateSport>(sportsActions.SportsActionTypes.UPDATE_SPORT),
        map(action => action.payload),
        switchMap((sport) => {
            return this.sportsService.updateSport(sport);
        }),
        switchMap((response: any) => {
            if (response.message === 'success') {
                return of(new sportsActions.LoadSports())
            } else {
                console.log('Error - Update Sport');
            }
        })
    );

    @Effect() addSport$ = this.actions$.pipe(
        ofType<sportsActions.AddSport>(sportsActions.SportsActionTypes.ADD_SPORT),
        map(action => action.payload),
        switchMap((name) => {
            return this.sportsService.addSport(name);
        }),
        switchMap((response: any) => {
            if (response.message === 'success') {
                return of(new sportsActions.LoadSports())
            } else {
                console.log('Error - Add Sport');
            }
        })
    );

    constructor(
        private actions$: Actions,
        public sportsService: SportsService,
        public store: Store<SportsState>
    ) {}
}