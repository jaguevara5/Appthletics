import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Sport } from '../../models/models';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { SportsService } from '../services/sports.service';
import { Subscription } from 'rxjs';
import { AddUpdateSportComponent } from './add-update-sport/add-update-sport.component';
import { MatDialogRef } from '@angular/material';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/components/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['select', 'name', 'edit'];
  selection = new SelectionModel<Sport>(true, []);

  sportsList: MatTableDataSource<Sport>;
  selectedItems: string[];

  showPage = false;
  dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>;

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
        this.sportsList = new MatTableDataSource(sports);
        this.sportsList.sort = this.sort;
        this.selectedItems = [];
        this.showPage = true;
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.sportsList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    this.selectedItems = [];
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.sportsList.data.forEach(row => {
        this.selection.select(row);
        this.selectedItems.push(row.id);
      });
    }
  }

  rowClicked(item: Sport, wasChecked: boolean) {
    if (wasChecked) {
      this.selectedItems = this.selectedItems.filter(id => item.id !== id);
    } else {
      this.selectedItems.push(item.id);
    }
  }

  editSport(item: Sport) {
    this.dialog.open(AddUpdateSportComponent, {
      data: {
        id: item.id,
        name: item.name
      }
    });
  }

  removeSelectedSports() {
    this.dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage =
      `Are you sure you want to delete ${this.selectedItems.length} item(s)?`;

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sportsService.deleteSports(this.selectedItems);
      }
      this.dialogRef = null;
    });
  }

  cancel() {
    this.router.navigate(['/settings']);
  }

  addSport() {
    this.dialog.open(AddUpdateSportComponent, {
      data: {

      }
    });
  }

  ngOnDestroy() {
    this.sportsSubsription.unsubscribe();
  }
}
