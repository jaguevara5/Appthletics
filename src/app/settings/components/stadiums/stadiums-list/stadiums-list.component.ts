import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Stadium } from 'src/app/models/models';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-stadiums-list',
    templateUrl: './stadiums-list.component.html',
    styleUrls: ['./stadiums-list.component.css']
})
export class StadiumsListComponent {
    @Input() stadiums: Stadium[];
    @Output() addUpdateStadium = new EventEmitter<Stadium>();
    @Output() deleteStadium = new EventEmitter<Stadium>();

    modalRef: BsModalRef;

    constructor() {}

    addNewStadium() {
        const stadium = {} as Stadium;
        stadium.name = '';
        stadium.address = '';
        this.addUpdateStadium.emit(stadium);
    }

    onClickRow(stadium: Stadium) {
        this.addUpdateStadium.emit(stadium);
    }

    delete(stadium: Stadium) {
        this.deleteStadium.emit(stadium);
    }
}
