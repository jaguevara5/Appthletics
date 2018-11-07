import { Component, OnInit, ViewChild } from '@angular/core';
import { Sport } from '../../models/models';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'name'];
  selection = new SelectionModel<Sport>(true, []);

  sportsList: MatTableDataSource<Sport>;
  selectedItems: Sport[];

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router
  ) {

    this.sportsList = new MatTableDataSource([
      {
        id: '1',
        name: 'Footbal'
      },
      {
        id: '2',
        name: 'Volleyball'
      },
      {
        id: '3',
        name: 'Soccer'
      },
      {
        id: '4',
        name: 'Swimming'
      },
      {
        id: '5',
        name: 'Baseball'
      }
    ]);
  }

  ngOnInit() {
    this.sportsList.sort = this.sort;
    this.selectedItems = [];
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.sportsList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.sportsList.data.forEach(row => this.selection.select(row));
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
}
