import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as uiActions from './ui.actions';
import { tap } from 'rxjs/operators';
import { ToastrType } from 'src/app/models/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UIEffects {

    @Effect({ dispatch: false }) showToastr$ = this.actions$.pipe(
        ofType<uiActions.ShowToastr>(uiActions.UIActionTypes.SHOW_TOASTR),
        tap((action: uiActions.ShowToastr) =>  {
            switch (action.payload.type) {
                case ToastrType.error:
                    this.toastrService.error(action.payload.body, action.payload.title);
                    break;
                case ToastrType.success:
                    this.toastrService.success(action.payload.body, action.payload.title);
                    break;
                default:
                    this.toastrService.show(action.payload.body, action.payload.title);
            }
        }),
    );

    constructor(
        private actions$: Actions,
        private toastrService: ToastrService
    ) {}
}
