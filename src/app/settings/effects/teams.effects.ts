import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as teamsActions from '../actions/teams.actions';
import * as uiActions from '../../shared/ui.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TeamsState } from '../reducers/teams.reducer';
import { ToastrType, TeamSaveUpdate } from 'src/app/models/models';
import { of } from 'rxjs';
import { TeamsService } from '../services/teams.service';

@Injectable()
export class TeamsEffects {

    @Effect() loadTeams$ = this.actions$.pipe(
        ofType<teamsActions.LoadTeams>(teamsActions.TeamsActionTypes.LOAD_TEAMS),
        switchMap(() =>  {
            return this.teamsService.getTeams().pipe(
                map((response) => {
                    if (response.message === 'success') {
                        const teams = response.data;
                        return new teamsActions.TeamsLoaded(teams);
                    } else {
                        return new teamsActions.TeamsError({
                            title: 'Teams - Load Teams',
                            message: 'Error while loading...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new teamsActions.TeamsError({
                        title: 'Teams - Load Teams',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() updateTeam$ = this.actions$.pipe(
        ofType<teamsActions.UpdateTeam>(teamsActions.TeamsActionTypes.UPDATE_TEAM),
        map(action => action.payload),
        switchMap((team) => {
            const updatedTeam: TeamSaveUpdate = {
                _id: team._id,
                name: team.name,
                district: team.district._id,
                sport: team.sport._id,
                school: team.school._id,
                category: team.category._id
            }
            return this.teamsService.updateTeam(updatedTeam).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new teamsActions.TeamsSuccess({
                            title: 'Update Team',
                            message: 'Team updated successfully'
                        }));

                        return new teamsActions.LoadTeams();
                    } else {
                        return new teamsActions.TeamsError({
                            title: 'Teams - Update Team',
                            message: 'Error while updating team...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new teamsActions.TeamsError({
                        title: 'Team - Update Team',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() addTeam$ = this.actions$.pipe(
        ofType<teamsActions.AddTeam>(teamsActions.TeamsActionTypes.ADD_TEAM),
        map(action => action.payload),
        switchMap((team) => {
            const newTeam: TeamSaveUpdate = {
                name: team.name,
                district: team.district._id,
                sport: team.sport._id,
                school: team.school._id,
                category: team.category._id
            }
            return this.teamsService.addTeam(newTeam).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new teamsActions.TeamsSuccess({
                            title: 'Add Team',
                            message: 'Team added successfully'
                        }));

                        return new teamsActions.LoadTeams();
                    } else {
                        return new teamsActions.TeamsError({
                            title: 'Teams - Add Team',
                            message: 'Error while adding team...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new teamsActions.TeamsError({
                        title: 'Teams - Add Team',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() deleteTeam$ = this.actions$.pipe(
        ofType<teamsActions.DeleteTeam>(teamsActions.TeamsActionTypes.DELETE_TEAM),
        map(action => action.payload),
        switchMap((team) => {
            return this.teamsService.deleteTeam(team).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new teamsActions.TeamsSuccess({
                            title: 'Delete Team',
                            message: 'Team deleted successfully'
                        }));
                        return new teamsActions.LoadTeams();
                    } else {
                        return new teamsActions.TeamsError({
                            title: 'Teams - Delete Team',
                            message: 'Error while deleting team...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new teamsActions.TeamsError({
                        title: 'Team - Delete Team',
                        message: err.message
                    }));
                })
            );
        })
    );


    @Effect() teamsSuccess$ = this.actions$.pipe(
        ofType<teamsActions.TeamsSuccess>(teamsActions.TeamsActionTypes.TEAMS_SUCCESS),
        map((action: teamsActions.TeamsSuccess) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.success
            }));
        })
    );

    @Effect() TeamsError$ = this.actions$.pipe(
        ofType<teamsActions.TeamsError>(teamsActions.TeamsActionTypes.TEAMS_ERROR),
        map((action: teamsActions.TeamsError) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.error
            }));
        })
    );

    constructor(
        private actions$: Actions,
        public teamsService: TeamsService,
        public store: Store<TeamsState>
    ) {}
}