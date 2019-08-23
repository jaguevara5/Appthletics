import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { District } from '../../models/models';

@Injectable()
export class DistrictsService {

    constructor(
        private http: HttpClient
    ) {}

    getDistricts() {
        return this.http.get<{message: string, data: any}>('http://localhost:3000/api/districts');
    }

    addDistrict(name: string) {
        const district: District = { name: name };
        return this.http.post<{message: string, districtId: string}>('http://localhost:3000/api/districts', district);
    }

    updateDistrict(district: District) {
        return this.http.put<{message: string}>('http://localhost:3000/api/districts/' + district._id, district);
    }

    deleteDistrict(districtId: string) {
        return this.http.delete(`http://localhost:3000/api/districts/${districtId}`);
    }
}
