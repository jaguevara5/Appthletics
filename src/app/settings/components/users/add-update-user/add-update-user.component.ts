import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../app.reducer';
import { CreateUser, UpdateUser } from '../../../../settings/actions/users.actions';
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
    passwordRequired: boolean;
    userForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddUpdateUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User,
        public store: Store<fromRoot.AppState>
    ) { }

    ngOnInit() {

        if (this.data.userId) {
            this.title = 'Update User';
            this.passwordRequired = false;
            this.model.id = this.data.id;
            this.userForm = new FormGroup({
                userId: new FormControl(this.data.userId, Validators.required),
                name: new FormControl(this.data.name, Validators.required),
                lastname: new FormControl(this.data.lastname, Validators.required),
                username: new FormControl(this.data.username, Validators.required),
                updatePassword: new FormControl(this.passwordRequired),
                password: new FormControl(''),
                confirmPassword: new FormControl('')
            });
            this.isNew = false;
        } else {
            this.title = 'Create User';
            this.passwordRequired = true;
            this.userForm = new FormGroup({
                userId: new FormControl('', Validators.required),
                name: new FormControl('', Validators.required),
                lastname: new FormControl('', Validators.required),
                username: new FormControl('', Validators.required),
                password: new FormControl('', Validators.required),
                confirmPassword: new FormControl('', Validators.required)
            });
        }
        this.onChanges();
    }

    onChanges() {

        this.userForm.valueChanges.subscribe(val => {
            this.model.userId = val.userId;
            this.model.name = val.name;
            this.model.lastname = val.lastname;
            this.model.username = val.username;
            if (this.isNew) {
                this.model.password = val.password;
                this.model.confirmPassword = val.confirmPassword;
                this.passwordDismatch = this.model.password !== this.model.confirmPassword;
            } else {
                this.passwordRequired = val.updatePassword;
                if (this.passwordRequired) {
                    this.model.password = val.password;
                    this.model.confirmPassword = val.confirmPassword;
                    this.userForm.get('password').setValidators([Validators.required]);
                    this.userForm.get('confirmPassword').setValidators([Validators.required]);
                    this.passwordDismatch = this.model.password !== this.model.confirmPassword;
                } else {
                    this.passwordDismatch = false;
                    this.userForm.get('password').setValidators(null);
                    this.userForm.get('confirmPassword').setValidators(null);
                }
            }
        });
    }

    submit() {

        if (this.isNew) {
            const passwordConfirmed = this.model.password === this.model.confirmPassword;
            if (passwordConfirmed) {
                this.passwordDismatch = false;
            } else {
                this.passwordDismatch = true;
                return;
            }
            this.model.username = this.model.username.toLowerCase();
            this.store.dispatch(new CreateUser(this.model));
        } else {
            if (this.passwordRequired) {
            const passwordConfirmed = this.model.password === this.model.confirmPassword;
            if (passwordConfirmed) {
                this.passwordDismatch = false;
            } else {
                this.passwordDismatch = true;
                return;
            }
            this.store.dispatch(new UpdateUser(this.model));
            }
        }
        this.dialogRef.close();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    isFormValid(): boolean {
        let isValid = false;

        if (this.isNew || this.passwordRequired) {
            if (this.userForm.valid && !this.passwordDismatch) {
                isValid = true;
            }
        }

        if (!this.passwordRequired && this.userForm.valid) {
            isValid = true;
        }

        return isValid;
    }
}
