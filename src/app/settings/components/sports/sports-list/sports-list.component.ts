import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Sport } from 'src/app/models/models';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-sports-list',
    templateUrl: './sports-list.component.html',
    styleUrls: ['./sports-list.component.css']
})
export class SportsListComponent {
    @Input() sports: Sport[];
    @Output() addUpdateSport = new EventEmitter<Sport>();
    @Output() deleteSport = new EventEmitter<Sport>();

    modalRef: BsModalRef;

    constructor() {}

    addNewSport() {
        const sport = {} as Sport;
        sport.name = '';
        this.addUpdateSport.emit(sport);
    }

    onClickRow(sport: Sport) {
        this.addUpdateSport.emit(sport);
    }

    delete(sport: Sport) {
        this.deleteSport.emit(sport);
    }
}
