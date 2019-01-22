import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as loginActions from './login.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {

    @Effect() userLogin$ = this.actions$.pipe(
        ofType<loginActions.UserLoginAction>(loginActions.LoginActionTypes.USER_LOGIN),
        map(action => action.payload),
        switchMap((sport) => {
            return this.loginService.userLogin(sport).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        localStorage.setItem('appthletics_token', response.data);
                        return new loginActions.LoginSuccess();
                    } else {
                        // return new sportsActions.SportsError({
                        //     title: 'Sports - Update Sport',
                        //     message: 'Error while updating sport...'
                        // });
                    }
                }),
                // catchError(err => {
                //     return of(new sportsActions.SportsError({
                //         title: 'Sports - Update Sport',
                //         message: err.message
                //     }));
                // })
            );
        })
    );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
     ofType(loginActions.LoginActionTypes.LOGIN_SUCCESS),
     tap(() => this.router.navigate(['/']))
   );

   @Effect({ dispatch: false })
   userLogout$ = this.actions$.pipe(
    ofType(loginActions.LoginActionTypes.USER_LOGOUT),
    tap(() => {
        localStorage.removeItem('appthletics_token');
        this.router.navigate(['/login']);
    })
  );

    constructor(
        private actions$: Actions,
        private loginService: LoginService,
        private router: Router
    ) {}
}
