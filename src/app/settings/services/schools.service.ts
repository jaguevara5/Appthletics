import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { School } from '../../models/models';
import { environment } from '../../../environments/environment'

@Injectable()
export class SchoolsService {

    constructor(
        private http: HttpClient
    ) {}

    getSchools() {
        return this.http.get<{message: string, data: any}>(environment.apiUrl + '/schools');
    }

    addSchool(school: School) {
        return this.http.post<{message: string, schoolId: string}>(environment.apiUrl + '/schools', school);
    }

    updateSchool(school: School) {
        return this.http.put<{message: string}>(environment.apiUrl + '/schools/' + school._id, school);
    }

    deleteSchool(schoolId: string) {
        return this.http.delete(environment.apiUrl + '/schools/' + schoolId);
    }
}
