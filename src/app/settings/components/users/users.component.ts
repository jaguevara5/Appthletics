import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { LoadUsers, DeleteUsers } from '../../actions/users.actions';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialogRef } from '@angular/material';
import * as fromRoot from '../../../app.reducer';
import { ConfirmDeleteDialogComponent } from '../../../shared/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

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

    selectedItems: string[];

    showPage = false;
    dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>;
    currentUser: string;

    isLoading: boolean;

    @ViewChild(MatSort) sort: MatSort;
    constructor(
        private router: Router,
        private store: Store<AppState>,
        public dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.store.dispatch(new LoadUsers());
        this.users$ = this.store.pipe(select(fromRoot.selectUsersList));
        this.currentUser = localStorage.getItem('appthletics_user');

        const data = this.users$.pipe(
            filter((users) => !!users)
        );

        this.userSubscription = data.subscribe((users) => {
            this.usersList = new MatTableDataSource(users);
            this.usersList.sort = this.sort;
            this.selectedItems = [];
            this.isLoading = false;
            this.showPage = true;
        });
    }

    editUser(item: User) {
        this.dialog.open(AddUpdateUserComponent, {
            data: {
                userId: item.userId,
                name: item.name,
                lastname: item.lastname,
                username: item.username,
                id: item.id,
                password: item.password
            }
        });
    }

    createUser() {
        this.dialog.open(AddUpdateUserComponent, {
            data: {

            }
        });
    }

    removeSelectedUsers() {
        this.dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
          disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage =
          `Are you sure you want to delete ${this.selectedItems.length} user(s)?`;

        this.dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.selection.clear();
            this.store.dispatch(new DeleteUsers(this.selectedItems));
          }
          this.dialogRef = null;
        });
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.usersList.data.length - 1;
        return numSelected === numRows;
      }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {

        this.selectedItems = [];
        if (this.isAllSelected()) {
            this.selection.clear();
        } else {
            this.usersList.data.forEach(row => {
                if (row.id !== this.currentUser) {
                    this.selection.select(row);
                    this.selectedItems.push(row.id);
                }
            });
        }
    }

    rowClicked(item: User, wasChecked: boolean) {

        if (item.id === this.currentUser) {
            return;
        }

        if (wasChecked) {
            this.selectedItems = this.selectedItems.filter(id => item.id !== id);
        } else {
            this.selectedItems.push(item.id);
        }
    }

    cancel() {
        this.router.navigate(['/settings']);
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
