import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState, selectAuthFailed } from '../app.reducer';
import { UserLoginAction } from './login.actions';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../app.reducer';
import { User } from '../settings/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  authFailed$: Observable<boolean>;
  authFailed;
  authSubscription: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.authFailed = false;
    this.authFailed$ = this.store.pipe(select(fromRoot.selectAuthFailed));
    this.authSubscription = this.authFailed$.subscribe(af => {
      this.authFailed = af;
    });
  }

  login() {
    const user: User = {
      username: this.userForm.get('userName').value.toLowerCase(),
      password: this.userForm.get('password').value
    };
    this.store.dispatch(new UserLoginAction(user));
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
