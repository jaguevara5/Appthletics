import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TeamSaveUpdate, TeamsQueryParams } from '../../models/models';
import { environment } from '../../../environments/environment'

@Injectable()
export class TeamsService {

    constructor(
        private http: HttpClient
    ) {}

    getTeams(params: TeamsQueryParams) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('district', params.district);
        queryParams = queryParams.append('sport', params.sport);
        queryParams = queryParams.append('category', params.category);
        return this.http.get<{message: string, data: any}>(environment.apiUrl + '/teams', { params: queryParams });
    }

    addTeam(team: TeamSaveUpdate) {
        return this.http.post<{message: string, teamId: string}>(environment.apiUrl + '/teams', team);
    }

    updateTeam(team: TeamSaveUpdate) {
        return this.http.put<{message: string}>(environment.apiUrl + '/teams/' + team._id, team);
    }

    deleteTeam(teamId: string) {
        return this.http.delete(environment.apiUrl + '/teams/' + teamId);
    }
}
