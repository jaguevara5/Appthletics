import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { LoadUsers } from '../../actions/users.actions';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialogRef } from '@angular/material';
import * as fromRoot from '../../../app.reducer';
import { ConfirmDeleteDialogComponent } from '../../../shared/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.css']

})
export class UsersComponent implements OnInit, OnDestroy {

    users$: Observable<User[]>;
    usersList: MatTableDataSource<User>;
    userSubscription: Subscription;

    displayedColumns: string[] = ['select', 'userId', 'name', 'lastname', 'username', 'edit'];
    selection = new SelectionModel<User>(true, []);

    sportsList: MatTableDataSource<User>;
    selectedItems: string[];

    showPage = false;
    dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>;

    isLoading: boolean;

    @ViewChild(MatSort) sort: MatSort;
    constructor(
        private store: Store<AppState>,
        public dialog: MatDialog,
    ) {}
    ngOnInit() {
        this.store.dispatch(new LoadUsers());
        this.users$ = this.store.pipe(select(fromRoot.selectUsersList));
        this.userSubscription = this.users$.subscribe((users: User[]) => {
            if (users) {
                this.usersList = new MatTableDataSource(users);
                this.usersList.sort = this.sort;
                this.selectedItems = [];
                this.isLoading = false;
                this.showPage = true;
            }
        });
    }

    editUser(item: User) {
        this.dialog.open(AddUpdateUserComponent, {
            data: {
            userId: item.userId,
            name: item.name,
            lastname: item.lastname,
            username: item.username
            }
        });
    }

    createUser() {
        this.dialog.open(AddUpdateUserComponent, {
            data: {

            }
        });
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
