import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/models';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { UserLoginAction } from './login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  login() {
    const user: User = {
      username: this.userForm.get('userName').value,
      password: this.userForm.get('password').value
    };
    this.store.dispatch(new UserLoginAction(user));
  }
}
