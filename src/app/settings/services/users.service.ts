import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../../environments/environment'

@Injectable()
export class UsersService {

    constructor(
        private http: HttpClient
    ) {}

    getUsers() {
        return this.http.get<{message: string, data: any}>(environment.apiUrl + '/users');
    }

    createUser(newUser: User) {
        return this.http.post<{message: string, data: any}>(environment.apiUrl + '/users/new', newUser);
    }

    deleteUsers(users: string[]) {
        return this.http.post(environment.apiUrl + '/users/delete', {users: users});
    }

    updateUser(user: User) {
        return this.http.put<{message: string}>(environment.apiUrl + '/users/' + user._id, user);
    }
}
