import { Component, Input, EventEmitter, Output } from '@angular/core';
import { District } from 'src/app/models/models';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-districts-list',
    templateUrl: './districts-list.component.html',
    styleUrls: ['./districts-list.component.css']
})
export class DistrictsListComponent {
    @Input() districts: District[];
    @Output() addUpdateDistrict = new EventEmitter<District>();
    @Output() deleteDistrict = new EventEmitter<District>();

    modalRef: BsModalRef;

    constructor() {}

    ngOnInit() {

    }

    addNewDistrict() {
        const district = {} as District;
        district.name = '';
        this.addUpdateDistrict.emit(district);
    }

    onClickRow(district: District) {
        this.addUpdateDistrict.emit(district);
    }

    delete(district: District) {
        this.deleteDistrict.emit(district);
    }
}
