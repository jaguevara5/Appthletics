import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sport } from '../../models/models';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable()
export class SportsService {

    private sports: Sport[];
    private sportsUpdated = new Subject<Sport[]>();

    constructor(
        private http: HttpClient
    ) {}

    getSports() {
        this.http
            .get<{message: string, data: any}>('http://localhost:3000/sports')
            .pipe(map((postData) => {
                return postData.data.map(sport => {
                    return {
                        id: sport._id,
                        name: sport.name
                    };
                });
            }))
            .subscribe((sportsData) => {
                this.sports = sportsData;
                this.sportsUpdated.next([...this.sports]);
            });
    }

    getSportsUpdateListener() {
        return this.sportsUpdated.asObservable();
    }

    addSport(name: string) {
        const sport: Sport = { name: name };
        this.http.post<{message: string, sportId: string}>('http://localhost:3000/sports', sport)
            .subscribe((response) => {
                if (response.message === 'success') {
                    sport.id = response.sportId;
                    this.sports.push(sport);
                this.sportsUpdated.next([...this.sports]);
                }
           });
    }

    updateSport(id: string, name: string) {
        const sport: Sport = {
            id: id,
            name: name
        };
        this.http.put<{message: string}>('http://localhost:3000/sports' + id, sport)
        .subscribe((response) => {
            if (response.message === 'success') { 
                this.getSports();
            }
        });
    }

    deleteSports(sports: string[]) {
        this.http.post('http://localhost:3000/sports/delete', {sports: sports})
        .subscribe(() => {
            this.getSports();
        });
    }
}
