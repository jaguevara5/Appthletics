import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../app.reducer';
import { UsersService } from '../../../../settings/services/users.service';
import { CreateUser } from '../../../../settings/actions/users.actions';
import { User } from 'src/app/settings/models/user';


@Component({
    selector: 'app-add-update-user',
    templateUrl: './add-update-user.component.html',
    styleUrls: ['./add-update-user.component.css']
})
export class AddUpdateUserComponent implements OnInit {

    title: string;
    form = new FormGroup({});
    model = {} as User;
    fields: FormlyFieldConfig[];
    isNew = true;
    passwordDismatch = false;

    constructor(
        public dialogRef: MatDialogRef<AddUpdateUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User,
        private usersService: UsersService,
        public store: Store<fromRoot.AppState>,
    ) { }

    ngOnInit() {

        if (this.data.userId) {
            this.isNew = false;
            this.title = 'Update User';
            this.model.userId = this.data.userId;
            this.model.name = this.data.name;
            this.model.lastname = this.data.lastname;
            this.model.username = this.data.username;
        } else {
            this.title = 'Create User';
        }
        this.initializeFields();
    }

    initializeFields() {

        this.fields = [
            {
                key: 'userId',
                type: 'input',
                templateOptions: {
                    label: 'User Id',
                    placeholder: 'User Id',
                    required: true,
                }
            },
            {
                key: 'name',
                type: 'input',
                templateOptions: {
                    label: 'Name',
                    placeholder: 'Name',
                    required: true,
                }
            },
            {
                key: 'lastname',
                type: 'input',
                templateOptions: {
                    label: 'Last Name',
                    placeholder: 'Last Name',
                    required: true,
                }
            },
            {
                key: 'username',
                type: 'input',
                templateOptions: {
                    label: 'Username',
                    placeholder: 'Username',
                    required: true,
                }
            },
            {
                key: 'password',
                type: 'input',
                templateOptions: {
                    label: 'Password',
                    placeholder: 'Password',
                    required: true,
                }
            },
            {
                key: 'comfirmPassword',
                type: 'input',
                templateOptions: {
                    label: 'Comfirm Password',
                    placeholder: 'Comfirm Password',
                    required: true,
                }
            }
        ];
    }

    submit(model: User) {

        if (this.isNew) {
            if (this.model.password === this.model.comfirmPassword) {
                this.passwordDismatch = false;
                this.store.dispatch(new CreateUser(model));
            } else {
                this.passwordDismatch = true;
                return;
            }
        } else {
            // this.store.dispatch(new CreateUser(model));
        }
        this.dialogRef.close();
    }

    isFormValid() {
        return this.form.valid;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
