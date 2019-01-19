import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sport } from '../../models/models';

@Injectable()
export class SportsService {

    constructor(
        private http: HttpClient
    ) {}

    getSports() {
        return this.http.get<{message: string, data: any}>('http://localhost:3000/api/sports');
    }

    addSport(name: string) {
        const sport: Sport = { name: name };
        return this.http.post<{message: string, sportId: string}>('http://localhost:3000/api/sports', sport);
    }

    updateSport(sport: Sport) {
        return this.http.put<{message: string}>('http://localhost:3000/api/sports/' + sport.id, sport);
    }

    deleteSports(sports: string[]) {
        return this.http.post('http://localhost:3000/api/sports/delete', {sports: sports});
    }
}
