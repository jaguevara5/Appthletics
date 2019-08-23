import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoriesService {

    constructor(
        private http: HttpClient
    ) {}

    getCategories() {
        return this.http.get<{message: string, data: any}>('http://localhost:3000/api/categories');
    }
}
