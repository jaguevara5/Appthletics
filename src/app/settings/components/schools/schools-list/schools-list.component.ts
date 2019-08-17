import { Component, Input, EventEmitter, Output } from '@angular/core';
import { School } from 'src/app/models/models';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-schools-list',
    templateUrl: './schools-list.component.html',
    styleUrls: ['./schools-list.component.css']
})
export class SchoolsListComponent {
    @Input() schools: School[];
    @Output() addUpdateSchool = new EventEmitter<School>();
    @Output() deleteSchool = new EventEmitter<School>();

    modalRef: BsModalRef;

    constructor() {}

    ngOnInit() {
        console.log(this.schools);
    }

    addNewSchool() {
        const school = {} as School;
        school.name = '';
        school.address = '';
        this.addUpdateSchool.emit(school);
    }

    onClickRow(school: School) {
        this.addUpdateSchool.emit(school);
    }

    delete(school: School) {
        this.deleteSchool.emit(school);
    }
}
