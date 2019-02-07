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
        // const user = {
        //     name: newUser.name,
        //     lastame: newUser.lastname,
        //     username: newUser.username,
        //     userId: newUser.userId,
        //     password: newUser.password
        // };
        return this.http.post<{message: string, data: any}>('http://localhost:3000/api/users/new', newUser);
    }
}
