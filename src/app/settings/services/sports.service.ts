import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Sport } from "../../models/models";

@Injectable()
export class SportsService {

    private sports: Sport[];

    constructor(
        private http: HttpClient
    ) {

    }

    getSports() {
        this.http.get<{message: string, data: Sport[]}>('http://localhost:3000/sports')
            .subscribe((sportsData) => {
                this.sports = sportsData.data;
            });
    }

}