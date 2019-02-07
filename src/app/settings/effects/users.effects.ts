import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usersActions from '../actions/users.actions';
import * as uiActions from '../../shared/ui.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SportsState } from '../reducers/sports.reducer';
import { Sport, ToastrType } from 'src/app/models/models';
import { of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { AppState } from 'src/app/app.reducer';

@Injectable()
export class UsersEffects {

    @Effect() loadUsers$ = this.actions$.pipe(
        ofType<usersActions.LoadUsers>(usersActions.UsersActionTypes.LOAD_USERS),
        switchMap(() =>  {
            return this.usersService.getUsers().pipe(
                map((response) => {
                    if (response.message === 'success') {
                        const users = response.data.map(user => {
                            return {
                                userId: user.userId,
                                name: user.name,
                                lastname: user.lastname,
                                username: user.username,
                                password: user.password
                            };
                        });
                        return new usersActions.UsersLoaded(users);
                    } else {
                        return new usersActions.UsersError({
                            title: 'Users - Load Users',
                            message: 'Error while loading users...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new usersActions.UsersError({
                        title: 'Users - Load Users',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() createUser$ = this.actions$.pipe(
        ofType<usersActions.CreateUser>(usersActions.UsersActionTypes.CREATE_USER),
        map(action => action.payload),
        switchMap((user) => {
            return this.usersService.createUser(user).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new usersActions.UsersSuccess({
                            title: 'Create User',
                            message: 'User created successfully'
                        }));

                        return new usersActions.LoadUsers();
                    } else {
                        return new usersActions.UsersError({
                            title: 'Users - Create User',
                            message: 'Error while creating user...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new usersActions.UsersError({
                        title: 'Users - Create User',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() sportsSuccess$ = this.actions$.pipe(
        ofType<usersActions.UsersSuccess>(usersActions.UsersActionTypes.USERS_SUCCESS),
        map((action: usersActions.UsersSuccess) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.success
            }));
        })
    );

    @Effect() sportsError$ = this.actions$.pipe(
        ofType<usersActions.UsersError>(usersActions.UsersActionTypes.USERS_ERROR),
        map((action: usersActions.UsersError) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.error
            }));
        })
    );

    constructor(
        private actions$: Actions,
        public usersService: UsersService,
        public store: Store<AppState>
    ) {}
}
