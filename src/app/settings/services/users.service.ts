import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class UsersService {

    constructor(
        private http: HttpClient
    ) {}

    getUsers() {
        return this.http.get<{message: string, data: any}>('http://localhost:3000/api/users');
    }

    createUser(newUser: User) {
        return this.http.post<{message: string, data: any}>('http://localhost:3000/api/users/new', newUser);
    }

    deleteUsers(users: string[]) {
        return this.http.post('http://localhost:3000/api/users/delete', {users: users});
    }

    updateUser(user: User) {
        return this.http.put<{message: string}>('http://localhost:3000/api/users/' + user.id, user);
    }
}
