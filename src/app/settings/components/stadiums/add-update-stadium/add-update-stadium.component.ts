import { Component, OnInit, Inject } from '@angular/core';
import { Stadium } from '../../../../models/models';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StadiumsService } from '../../../services/stadiums.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../app.reducer';
import { UpdateStadium, AddStadium } from '../../../actions/stadiums.actions';


@Component({
    selector: 'app-add-update-stadium',
    templateUrl: './add-update-stadium.component.html',
    styleUrls: ['./add-update-stadium.component.css']
  })
  export class AddUpdateStadiumComponent implements OnInit {

    title: string;
    form = new FormGroup({});
    model = {} as Stadium;
    fields: FormlyFieldConfig[];
    isNew = true;

    constructor(
      public dialogRef: MatDialogRef<AddUpdateStadiumComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Stadium,
      private stadiumsService: StadiumsService,
      public store: Store<fromRoot.AppState>,
    ) { }

    ngOnInit() {

      if (this.data.id) {
        this.isNew = false;
        this.title = 'Update Stadium';
        this.model.id = this.data.id;
        this.model.name = this.data.name;
        this.model.address = this.data.address;
      } else {
        this.title = 'Add Stadium';
      }
      this.initializeFields();
    }

    initializeFields() {

      this.fields = [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name',
            placeholder: 'Stadium\'s name',
            required: true,
          }
        },
        {
            key: 'address',
            type: 'input',
            templateOptions: {
              label: 'Address',
              placeholder: 'Stadium\'s address',
              required: true,
            }
          }
      ];
    }

    submit(model: Stadium) {

      if (this.isNew) {
        this.store.dispatch(new AddStadium(model));
      } else {
        this.store.dispatch(new UpdateStadium(model));
      }
      this.dialogRef.close();
    }

    isFormValid() {
      return this.form.valid;
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  }
