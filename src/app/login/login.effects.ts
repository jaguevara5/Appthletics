import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as loginActions from './login.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Injectable()
export class LoginEffects {

    @Effect() userLogin$ = this.actions$.pipe(
        ofType<loginActions.UserLoginAction>(loginActions.LoginActionTypes.USER_LOGIN),
        map(action => action.payload),
        switchMap((user) => {
            return this.loginService.userLogin(user).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        localStorage.setItem('appthletics_token', response.data.token);
                        localStorage.setItem('appthletics_user', response.data.user._id);
                        return new loginActions.LoginSuccess();
                    } else {
                        return new loginActions.LoginFailed(true);
                    }
                }),
                catchError(err => {
                    return of(new loginActions.LoginFailed(true));
                })
            );
        })
    );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
     ofType(loginActions.LoginActionTypes.LOGIN_SUCCESS),
     tap(() => {
         this.router.navigate(['/']);
        })
   );

   @Effect({ dispatch: false })
   userLogout$ = this.actions$.pipe(
    ofType(loginActions.LoginActionTypes.USER_LOGOUT),
    tap(() => {
        localStorage.removeItem('appthletics_token');
        this.router.navigate(['/login']);
        this.store.dispatch(new loginActions.LoginFailed(false));
    })
  );

    constructor(
        private actions$: Actions,
        private loginService: LoginService,
        private router: Router,
        private store: Store<AppState>
    ) {}
}
