import { Component, OnInit, Inject } from '@angular/core';
import { Sport } from '../../../models/models';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SportsService } from '../../services/sports.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'app-add-update-sport',
    templateUrl: './add-update-sport.component.html',
    styleUrls: ['./add-update-sport.component.css']
  })
  export class AddUpdateSportComponent implements OnInit {

    title: string;
    form = new FormGroup({});
    model = {} as Sport;
    fields: FormlyFieldConfig[];
    isNew = true;

    constructor(
      public dialogRef: MatDialogRef<AddUpdateSportComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Sport,
      private sportsService: SportsService,
    ) { }

    ngOnInit() {

      if (this.data.id) {
        this.isNew = false;
        this.title = 'Update Sport';
        this.model.id = this.data.id;
        this.model.name = this.data.name;
      } else {
        this.title = 'Add Sport';
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
            placeholder: 'Sport\'s name',
            required: true,
          }
        }
      ];
    }

    submit(model: Sport) {

      if (this.isNew) {
        this.sportsService.addSport(model.name);
      } else {
        this.sportsService.updateSport(model.id, model.name);
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
