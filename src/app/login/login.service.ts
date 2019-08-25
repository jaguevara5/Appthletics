import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../settings/models/user';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService
    ) {}

    userLogin(user: User) {
        return this.http.post(environment.apiUrl + '/auth/login', user);
    }

    isAuthenticated(): boolean {

        const token = localStorage.getItem('appthletics_token');
        if (token) {
            console.log('Token expires in: ' + this.jwtHelper.getTokenExpirationDate(token));
        }
        return !this.jwtHelper.isTokenExpired(token);
    }
}
