import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from 'src/app/models/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { LoadSchools, UpdateSchool, AddSchool, DeleteSchool } from '../../actions/schools.actions';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-schools',
    templateUrl: './schools.component.html',
    styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {

    schools$: Observable<School[]>;
    selectedSchool: School;
    modalRef: BsModalRef;
    
    @ViewChild('editTemplate') editTeamplate: ElementRef;
    @ViewChild('deleteTemplate') deleteTeamplate: ElementRef;
    constructor(
        public store: Store<fromRoot.AppState>,
        private modalService: BsModalService) {

    }

    ngOnInit() {
        this.store.dispatch(new LoadSchools());
        this.schools$ = this.store.pipe(select(fromRoot.selectSchoolsList));
    }

    addUpdateSchool($event: School) {
        this.selectedSchool = $event;
        this.modalRef = this.modalService.show(this.editTeamplate);
    }

    saveSchool($event: School) {
        this.modalRef.hide();
        if ($event._id) {
            this.store.dispatch(new UpdateSchool($event));
        } else {
            this.store.dispatch(new AddSchool($event));
        }
    }

    deleteSchool($event: School) {
        this.selectedSchool = $event;
        this.modalRef = this.modalService.show(this.deleteTeamplate);
    }

    deleteConfirmed() {
        this.modalRef.hide();
        this.store.dispatch(new DeleteSchool(this.selectedSchool._id));
    }
}
