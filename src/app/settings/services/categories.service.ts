import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable()
export class CategoriesService {

    constructor(
        private http: HttpClient
    ) {}

    getCategories() {
        return this.http.get<{message: string, data: any}>(environment.apiUrl + '/categories');
    }
}
