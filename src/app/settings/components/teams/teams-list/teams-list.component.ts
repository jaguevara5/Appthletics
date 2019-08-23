import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Team } from 'src/app/models/models';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-teams-list',
    templateUrl: './teams-list.component.html',
    styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent {
    @Input() teams: Team[];
    @Output() addUpdateTeam = new EventEmitter<Team>();
    @Output() deleteTeam = new EventEmitter<Team>();

    modalRef: BsModalRef;

    constructor() {}

    addNewTeam() {
        const team = {} as Team;
        this.addUpdateTeam.emit(team);
    }

    onClickRow(team: Team) {
        this.addUpdateTeam.emit(team);
    }

    delete(team: Team) {
        this.deleteTeam.emit(team);
    }
}
