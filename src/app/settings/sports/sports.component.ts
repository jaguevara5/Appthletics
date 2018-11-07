import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Sport } from '../../models/models';
import { MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { SportsService } from '../services/sports.service';
import { Subscription } from 'rxjs';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['select', 'name'];
  selection = new SelectionModel<Sport>(true, []);

  sportsList: MatTableDataSource<Sport>;
  selectedItems: Sport[];

  showPage = false;

  private sportsSubsription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private sportsService: SportsService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.sportsService.getSports();
    this.sportsSubsription = this.sportsService.getSportsUpdateListener()
      .subscribe((sports: Sport[]) => {
        this.sportsList = new MatTableDataSource(sports)
        this.sportsList.sort = this.sort;
        this.selectedItems = [];
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.sportsList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    if(this.isAllSelected()) {
      this.selection.clear();
      this.selectedItems = [];
    } else {
      this.sportsList.data.forEach(row => this.selection.select(row));
      this.selectedItems = this.sportsList.data;
    }        
  }

  rowClicked(item: Sport, wasChecked: boolean) {
    console.log('Checkbox clicked...');
    if (wasChecked) {
      this.selectedItems = this.selectedItems.filter(sport => item.id !== sport.id);
    } else {
      this.selectedItems.push(item);
    }
  }

  removeSelectedSports() {

    this.selectedItems.forEach(selectedSport => {
      this.sportsList.data = this.sportsList.data.filter(sport => selectedSport.id !== sport.id);
    });
  }

  cancel() {
    this.router.navigate(['/settings']);
  }

  addSport() {
    this.dialog.open(AddUpdateSportDialog, {
      data: {

      }
    });
  }

  ngOnDestroy() {
    this.sportsSubsription.unsubscribe();
  }
}

@Component({
  selector: 'app-add-update-sport',
  templateUrl: './add-update-sport.component.html',
  styleUrls: ['./add-update-sport.component.css']
})
export class AddUpdateSportDialog implements OnInit {

  title: string;
  form = new FormGroup({});
  model = {} as Sport;
  fields: FormlyFieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<AddUpdateSportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Sport,
    private sportsService: SportsService,
  ) { }

  ngOnInit() {

    if (this.data.id) {
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
    console.log(model.name);
    this.sportsService.addSport(model.name);
    this.dialogRef.close();
  }

  isFormValid() {
    return this.form.valid;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
