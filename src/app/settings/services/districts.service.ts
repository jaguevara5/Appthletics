import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { District } from '../../models/models';
import { environment } from '../../../environments/environment'

@Injectable()
export class DistrictsService {

    constructor(
        private http: HttpClient
    ) {}

    getDistricts() {
        return this.http.get<{message: string, data: any}>(environment.apiUrl + '/districts');
    }

    addDistrict(name: string) {
        const district: District = { name: name };
        return this.http.post<{message: string, districtId: string}>(environment.apiUrl + '/districts', district);
    }

    updateDistrict(district: District) {
        return this.http.put<{message: string}>(environment.apiUrl + '/districts/' + district._id, district);
    }

    deleteDistrict(districtId: string) {
        return this.http.delete(environment.apiUrl + '/districts/' + districtId);
    }
}
