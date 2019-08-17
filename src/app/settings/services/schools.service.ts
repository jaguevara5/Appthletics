import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { School } from '../../models/models';

@Injectable()
export class SchoolsService {

    constructor(
        private http: HttpClient
    ) {}

    getSchools() {
        return this.http.get<{message: string, data: any}>('http://localhost:3000/api/schools');
    }

    addSchool(school: School) {
        return this.http.post<{message: string, schoolId: string}>('http://localhost:3000/api/schools', school);
    }

    updateSchool(school: School) {
        return this.http.put<{message: string}>('http://localhost:3000/api/schools/' + school.id, school);
    }

    deleteSchool(schoolId: string) {
        return this.http.delete(`http://localhost:3000/api/schools/${schoolId}`);
    }
}
