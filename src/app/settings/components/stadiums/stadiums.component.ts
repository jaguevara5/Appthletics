import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Stadium } from 'src/app/models/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { LoadStadiums, UpdateStadium, AddStadium, DeleteStadium } from '../../actions/stadiums.actions';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-stadiums',
    templateUrl: './stadiums.component.html',
    styleUrls: ['./stadiums.component.css']
})
export class StadiumsComponent implements OnInit {

    stadiums$: Observable<Stadium[]>;
    selectedStadium: Stadium;
    modalRef: BsModalRef;

    @ViewChild('editTemplate') editTeamplate: ElementRef;
    @ViewChild('deleteTemplate') deleteTeamplate: ElementRef;
    constructor(
        public store: Store<fromRoot.AppState>,
        private modalService: BsModalService) {

    }

    ngOnInit() {
        this.store.dispatch(new LoadStadiums());
        this.stadiums$ = this.store.pipe(select(fromRoot.selectStadiumsList));
    }

    addUpdateStadium($event: Stadium) {
        this.selectedStadium = $event;
        this.modalRef = this.modalService.show(this.editTeamplate);
    }

    saveStadium($event: Stadium) {
        this.modalRef.hide();
        if ($event._id) {
            this.store.dispatch(new UpdateStadium($event));
        } else {
            this.store.dispatch(new AddStadium($event));
        }
    }

    deleteStadium($event: Stadium) {
        this.selectedStadium = $event;
        this.modalRef = this.modalService.show(this.deleteTeamplate);
    }

    deleteConfirmed() {
        this.modalRef.hide();
        this.store.dispatch(new DeleteStadium(this.selectedStadium._id));
    }
}
