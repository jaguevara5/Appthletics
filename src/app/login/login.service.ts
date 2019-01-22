import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/models';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class LoginService {

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService
    ) {}

    userLogin(user: User) {
        return this.http.post('http://localhost:3000/api/auth/login', user);
    }

    isAuthenticated(): boolean {

        const token = localStorage.getItem('appthletics_token');
        if (token) {
            console.log('Token expires in: ' + this.jwtHelper.getTokenExpirationDate(token));
        }
        return !this.jwtHelper.isTokenExpired(token);
    }
}
