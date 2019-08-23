import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stadium } from '../../models/models';

@Injectable()
export class StadiumsService {

    constructor(
        private http: HttpClient
    ) {}

    getStadiums() {
        return this.http.get<{message: string, data: any}>('http://localhost:3000/api/stadiums');
    }

    addStadium(stadium: Stadium) {
        return this.http.post<{message: string, stadiumId: string}>('http://localhost:3000/api/stadiums', stadium);
    }

    updateStadium(stadium: Stadium) {
        return this.http.put<{message: string}>('http://localhost:3000/api/stadiums/' + stadium._id, stadium);
    }

    deleteStadiums(stadiums: string[]) {
        return this.http.post('http://localhost:3000/api/stadiums/delete', {stadiums: stadiums});
    }
}
