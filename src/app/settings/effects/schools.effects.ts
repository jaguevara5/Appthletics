import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as schoolsActions from '../actions/schools.actions';
import * as uiActions from '../../shared/ui.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { SchoolsService } from '../services/schools.service';
import { Store } from '@ngrx/store';
import { SchoolsState } from '../reducers/schools.reducer';
import { ToastrType } from 'src/app/models/models';
import { of } from 'rxjs';

@Injectable()
export class SchoolsEffects {

    @Effect() loadSchools$ = this.actions$.pipe(
        ofType<schoolsActions.LoadSchools>(schoolsActions.SchoolsActionTypes.LOAD_SCHOOLS),
        switchMap(() =>  {
            return this.schoolsService.getSchools().pipe(
                map((response) => {
                    if (response.message === 'success') {
                        const schools = response.data.map(school => {
                            return {
                                id: school._id,
                                name: school.name,
                                address: school.address
                            };
                        });
                        return new schoolsActions.SchoolsLoaded(schools);
                    } else {
                        return new schoolsActions.SchoolsError({
                            title: 'Schools - Load Schools',
                            message: 'Error while loading...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new schoolsActions.SchoolsError({
                        title: 'Schools - Load Schools',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() updateSchool$ = this.actions$.pipe(
        ofType<schoolsActions.UpdateSchool>(schoolsActions.SchoolsActionTypes.UPDATE_SCHOOL),
        map(action => action.payload),
        switchMap((school) => {
            return this.schoolsService.updateSchool(school).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new schoolsActions.SchoolsSuccess({
                            title: 'Update School',
                            message: 'School updated successfully'
                        }));

                        return new schoolsActions.LoadSchools();
                    } else {
                        return new schoolsActions.SchoolsError({
                            title: 'Schools - Update School',
                            message: 'Error while updating school...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new schoolsActions.SchoolsError({
                        title: 'School - Update School',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() addSchool$ = this.actions$.pipe(
        ofType<schoolsActions.AddSchool>(schoolsActions.SchoolsActionTypes.ADD_SCHOOL),
        map(action => action.payload),
        switchMap((school) => {
            return this.schoolsService.addSchool(school).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new schoolsActions.SchoolsSuccess({
                            title: 'Add School',
                            message: 'School added successfully'
                        }));

                        return new schoolsActions.LoadSchools();
                    } else {
                        return new schoolsActions.SchoolsError({
                            title: 'Schools - Add School',
                            message: 'Error while adding school...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new schoolsActions.SchoolsError({
                        title: 'Schools - Add School',
                        message: err.message
                    }));
                })
            );
        })
    );

    @Effect() deleteSchool$ = this.actions$.pipe(
        ofType<schoolsActions.DeleteSchool>(schoolsActions.SchoolsActionTypes.DELETE_SCHOOL),
        map(action => action.payload),
        switchMap((school) => {
            return this.schoolsService.deleteSchool(school).pipe(
                map((response: any) => {
                    if (response.message === 'success') {

                        this.store.dispatch(new schoolsActions.SchoolsSuccess({
                            title: 'Delete School',
                            message: 'School deleted successfully'
                        }));
                        return new schoolsActions.LoadSchools();
                    } else {
                        return new schoolsActions.SchoolsError({
                            title: 'Schools - Delete School',
                            message: 'Error while deleting school...'
                        });
                    }
                }),
                catchError(err => {
                    return of(new schoolsActions.SchoolsError({
                        title: 'School - Delete School',
                        message: err.message
                    }));
                })
            );
        })
    );


    @Effect() schoolsSuccess$ = this.actions$.pipe(
        ofType<schoolsActions.SchoolsSuccess>(schoolsActions.SchoolsActionTypes.SCHOOLS_SUCCESS),
        map((action: schoolsActions.SchoolsSuccess) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.success
            }));
        })
    );

    @Effect() schoolsError$ = this.actions$.pipe(
        ofType<schoolsActions.SchoolsError>(schoolsActions.SchoolsActionTypes.SCHOOLS_ERROR),
        map((action: schoolsActions.SchoolsError) => {
            return new uiActions.ShowToastr(({
                title: action.payload.title,
                body: action.payload.message,
                type: ToastrType.error
            }));
        })
    );

    constructor(
        private actions$: Actions,
        public schoolsService: SchoolsService,
        public store: Store<SchoolsState>
    ) {}
}