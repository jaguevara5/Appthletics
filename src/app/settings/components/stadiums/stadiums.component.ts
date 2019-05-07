import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Stadium } from '../../../models/models';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Subscription, Observable,  } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { LoadStadiums } from '../../actions/stadiums.actions';
import { AddUpdateStadiumComponent } from './add-update-stadium/add-update-stadium.component';


@Component({
    selector: 'app-stadiums',
    templateUrl: './stadiums.component.html',
    styleUrls: ['./stadiums.component.css']
})
export class StadiumsComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['select', 'name', 'address', 'edit'];
    selection = new SelectionModel<Stadium>(true, []);

    stadiumsList: MatTableDataSource<Stadium>;
    selectedItems: string[];

    showPage = false;
    dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>;

    isLoading: boolean;

    private stadiumsSubsription: Subscription;
    stadiums$: Observable<Stadium[]>;

    @ViewChild(MatSort) sort: MatSort;
    constructor(
      private router: Router,
      public store: Store<fromRoot.AppState>,
      public dialog: MatDialog,
    ) {
    }

    ngOnInit() {

      this.isLoading = true;
      this.store.dispatch(new LoadStadiums());
      this.stadiums$ = this.store.pipe(select(fromRoot.selectStadiumsList));
      this.stadiumsSubsription = this.stadiums$.subscribe((stadiums: Stadium[]) => {
        if (stadiums) {
          this.stadiumsList = new MatTableDataSource(stadiums);
          this.stadiumsList.sort = this.sort;
          this.selectedItems = [];
          this.isLoading = false;
          this.showPage = true;
        }
      });
    }

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.stadiumsList.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {

      this.selectedItems = [];
      if (this.isAllSelected()) {
        this.selection.clear();
      } else {
        this.stadiumsList.data.forEach(row => {
          this.selection.select(row);
          this.selectedItems.push(row.id);
        });
      }
    }

    rowClicked(item: Stadium, wasChecked: boolean) {
      if (wasChecked) {
        this.selectedItems = this.selectedItems.filter(id => item.id !== id);
      } else {
        this.selectedItems.push(item.id);
      }
    }

    editStadium(item: Stadium) {
      this.dialog.open(AddUpdateStadiumComponent, {
        data: {
          id: item.id,
          name: item.name,
          address: item.address
        }
      });
    }

    removeSelectedStadiums() {
    //   this.dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
    //     disableClose: false
    //   });
    //   this.dialogRef.componentInstance.confirmMessage =
    //     `Are you sure you want to delete ${this.selectedItems.length} item(s)?`;

    //   this.dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       this.store.dispatch(new DeleteStadiums(this.selectedItems));
    //     }
    //     this.dialogRef = null;
    //   });
    }

    cancel() {
      this.router.navigate(['/settings']);
    }

    addStadium() {
      this.dialog.open(AddUpdateStadiumComponent, {
        data: {

        }
      });
    }

    ngOnDestroy() {
      this.stadiumsSubsription.unsubscribe();
    }
}
