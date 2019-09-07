import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Sport } from '../../../models/models';
import { Observable,  } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LoadSports, DeleteSport, UpdateSport, AddSport } from '../../actions/sports.actions';
import * as fromRoot from '../../../app.reducer';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  sports$: Observable<Sport[]>;
  selectedSport: Sport;
  modalRef: BsModalRef;
  
  @ViewChild('editTemplate') editTeamplate: ElementRef;
  @ViewChild('deleteTemplate') deleteTeamplate: ElementRef;
  constructor(
      public store: Store<fromRoot.AppState>,
      private modalService: BsModalService) {

  }

  ngOnInit() {
      this.store.dispatch(new LoadSports());
      this.sports$ = this.store.pipe(select(fromRoot.selectSportsList));
  }

  addUpdateSport($event: Sport) {
      this.selectedSport = $event;
      this.modalRef = this.modalService.show(this.editTeamplate);
  }

  saveSport($event: Sport) {
      this.modalRef.hide();
      if ($event._id) {
          this.store.dispatch(new UpdateSport($event));
      } else {
          this.store.dispatch(new AddSport($event.name));
      }
  }

  deleteSport($event: Sport) {
      this.selectedSport = $event;
      this.modalRef = this.modalService.show(this.deleteTeamplate);
  }

  deleteConfirmed() {
      this.modalRef.hide();
      this.store.dispatch(new DeleteSport(this.selectedSport._id));
  }
}
