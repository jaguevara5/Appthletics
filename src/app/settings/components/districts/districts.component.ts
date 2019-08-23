import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from 'src/app/models/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { LoadDistricts, UpdateDistrict, AddDistrict, DeleteDistrict } from '../../actions/districts.actions';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-districts',
    templateUrl: './districts.component.html',
    styleUrls: ['./districts.component.css']
})
export class DistrictsComponent implements OnInit {

    districts$: Observable<District[]>;
    selectedDistrict: District;
    modalRef: BsModalRef;
    
    @ViewChild('editTemplate') editTeamplate: ElementRef;
    @ViewChild('deleteTemplate') deleteTeamplate: ElementRef;
    constructor(
        public store: Store<fromRoot.AppState>,
        private modalService: BsModalService) {

    }

    ngOnInit() {
        this.store.dispatch(new LoadDistricts());
        this.districts$ = this.store.pipe(select(fromRoot.selectDistrictsList));
    }

    addUpdateDistrict($event: District) {
        this.selectedDistrict = $event;
        this.modalRef = this.modalService.show(this.editTeamplate);
    }

    saveDistrict($event: District) {
        this.modalRef.hide();
        if ($event._id) {
            this.store.dispatch(new UpdateDistrict($event));
        } else {
            this.store.dispatch(new AddDistrict($event.name));
        }
    }

    deleteDistrict($event: District) {
        this.selectedDistrict = $event;
        this.modalRef = this.modalService.show(this.deleteTeamplate);
    }

    deleteConfirmed() {
        this.modalRef.hide();
        this.store.dispatch(new DeleteDistrict(this.selectedDistrict._id));
    }
}
