import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stadium } from '../../models/models';
import { environment } from '../../../environments/environment';

@Injectable()
export class StadiumsService {

    constructor(
        private http: HttpClient
    ) {}

    getStadiums() {
        return this.http.get<{message: string, data: any}>(environment.apiUrl + '/stadiums');
    }

    addStadium(stadium: Stadium) {
        return this.http.post<{message: string, stadiumId: string}>(environment.apiUrl + '/stadiums', stadium);
    }

    updateStadium(stadium: Stadium) {
        return this.http.put<{message: string}>(environment.apiUrl + '/stadiums/' + stadium._id, stadium);
    }

    deleteStadium(stadiumId: string) {
        return this.http.delete(environment.apiUrl + '/stadiums/' + stadiumId);
    }
}
