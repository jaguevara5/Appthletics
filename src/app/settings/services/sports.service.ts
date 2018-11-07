import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Sport } from "../../models/models";
import { Subject } from "rxjs";

@Injectable()
export class SportsService {

    private sports: Sport[];
    private sportsUpdated = new Subject<Sport[]>();

    constructor(
        private http: HttpClient
    ) {}

    getSports() {
        this.http.get<{message: string, data: Sport[]}>('http://localhost:3000/sports')
            .subscribe((sportsData) => {
                this.sports = sportsData.data;
                this.sportsUpdated.next([...this.sports]);
            });
    }

    getSportsUpdateListener() {
        return this.sportsUpdated.asObservable();
    }

    addSport(name: string) {
        const sport: Sport = { name: name };
        this.http.post<{message: string}>('http://localhost:3000/sports', sport)
            .subscribe((response) => {
                console.log(response.message);
                this.sports.push(sport);
                this.sportsUpdated.next([...this.sports]);
1            });
    }
}