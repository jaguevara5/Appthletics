import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamSaveUpdate } from '../../models/models';

@Injectable()
export class TeamsService {

    constructor(
        private http: HttpClient
    ) {}

    getTeams() {
        return this.http.get<{message: string, data: any}>('http://localhost:3000/api/teams');
    }

    addTeam(team: TeamSaveUpdate) {
        return this.http.post<{message: string, teamId: string}>('http://localhost:3000/api/teams', team);
    }

    updateTeam(team: TeamSaveUpdate) {
        return this.http.put<{message: string}>('http://localhost:3000/api/teams/' + team._id, team);
    }

    deleteTeam(teamId: string) {
        return this.http.delete(`http://localhost:3000/api/teams/${teamId}`);
    }
}
