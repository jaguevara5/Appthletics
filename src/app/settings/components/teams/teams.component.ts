import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { Team, School, District, Sport, Category } from 'src/app/models/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoadTeams, UpdateTeam, AddTeam, DeleteTeam } from '../../actions/teams.actions';
import { LoadSchools } from '../../actions/schools.actions';
import { filter } from 'rxjs/internal/operators/filter';
import { LoadDistricts } from '../../actions/districts.actions';
import { LoadSports } from '../../actions/sports.actions';
import { LoadCategories } from '../../actions/categories.actions';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

    teams$: Observable<Team[]>;
    schools$: Observable<School[]>;
    districts$: Observable<District[]>;
    sports$: Observable<Sport[]>;
    categories$: Observable<Category[]>;
    allData$: Observable<any[]>;
    selectedTeam: Team;
    schools: School[];
    districts: District[];
    sports: Sport[];
    categories: Category[];

    districtFilter: string;
    sportFilter: string;
    categoryFilter: string;

    modalRef: BsModalRef;
    
    @ViewChild('editTemplate') editTeamplate: ElementRef;
    @ViewChild('deleteTemplate') deleteTeamplate: ElementRef;
    constructor(
        public store: Store<fromRoot.AppState>,
        private modalService: BsModalService) {

    }

    ngOnInit() {

        this.store.dispatch(new LoadSchools());
        this.store.dispatch(new LoadDistricts());
        this.store.dispatch(new LoadSports());
        this.store.dispatch(new LoadCategories());
        this.teams$ = this.store.pipe(select(fromRoot.selectTeamsList));
        this.schools$ = this.store.pipe(select(fromRoot.selectSchoolsList));
        this.districts$ = this.store.pipe(select(fromRoot.selectDistrictsList));
        this.sports$ = this.store.pipe(select(fromRoot.selectSportsList));
        this.categories$ = this.store.pipe(select(fromRoot.selectCategoriesList));
        this.allData$ = combineLatest([this.schools$, this.districts$, this.sports$, this.categories$]).pipe(
            filter(([schools, districts, sports, categories]) => !!schools && !!districts && !!sports && !!categories)
        );

        this.allData$.subscribe(([schools, districts, sports, categories]) => {
            this.schools = [...schools];
            this.districts = [...districts];
            this.sports = [...sports];
            this.categories = [...categories];
            this.districtFilter = this.districts[0]._id;
            this.sportFilter = this.sports[0]._id;
            this.categoryFilter = this.categories[0]._id;
            this.store.dispatch(new LoadTeams({
                district: this.districtFilter,
                sport: this.sportFilter,
                category: this.categoryFilter 
            }));
        });
    }

    addUpdateTeam($event: Team) {
        this.selectedTeam = $event;
        this.modalRef = this.modalService.show(this.editTeamplate);
    }

    saveTeam($event: Team) {
        this.districtFilter = $event.district._id;
        this.sportFilter = $event.sport._id;
        this.categoryFilter = $event.category._id;
        this.modalRef.hide();
        if ($event._id) {
            this.store.dispatch(new UpdateTeam($event));
        } else {
            this.store.dispatch(new AddTeam($event));
        }
    }

    deleteTeam($event: Team) {
        this.selectedTeam = $event;
        this.modalRef = this.modalService.show(this.deleteTeamplate);
    }

    deleteConfirmed() {
        this.modalRef.hide();
        this.store.dispatch(new DeleteTeam(this.selectedTeam));
    }

    onDistrictChange(districtId: string) {
        this.districtFilter = districtId;
        this.store.dispatch(new LoadTeams({
            district: this.districtFilter,
            sport: this.sportFilter,
            category: this.categoryFilter 
        }));
    }

    onFilterChange() {
        this.store.dispatch(new LoadTeams({
            district: this.districtFilter,
            sport: this.sportFilter,
            category: this.categoryFilter 
        }));
    }

    onCategoryChange(categoryId: string) {
        this.categoryFilter = categoryId;
        this.store.dispatch(new LoadTeams({
            district: this.districtFilter,
            sport: this.sportFilter,
            category: this.categoryFilter 
        }));
    }
}
