import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sport } from '../../models/models';
import { environment } from '../../../environments/environment'

@Injectable()
export class SportsService {

    constructor(
        private http: HttpClient
    ) {}

    getSports() {
        return this.http.get<{message: string, data: any}>(environment.apiUrl + '/sports');
    }

    addSport(name: string) {
        const sport: Sport = { name: name };
        return this.http.post<{message: string, sportId: string}>(environment.apiUrl + '/sports', sport);
    }

    updateSport(sport: Sport) {
        return this.http.put<{message: string}>(environment.apiUrl + '/sports/' + sport._id, sport);
    }

    deleteSport(sportId: string) {
        return this.http.delete(environment.apiUrl + '/sports/' + sportId);
    }
}
