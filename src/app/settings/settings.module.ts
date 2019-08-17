import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ModalModule } from 'ngx-bootstrap/modal';

// Components
import { SettingsComponent } from './settings.component';
import { AddUpdateSportComponent } from './components/sports/add-update-sport/add-update-sport.component';
import { SportsComponent } from './components/sports/sports.component';
import { UsersComponent } from './components/users/users.component';
import { AddUpdateUserComponent } from './components/users/add-update-user/add-update-user.component';
import { StadiumsComponent } from './components/stadiums/stadiums.component';
import { AddUpdateStadiumComponent } from './components/stadiums/add-update-stadium/add-update-stadium.component';

// Services
import { SportsService } from './services/sports.service';
import { UsersService } from './services/users.service';
import { StadiumsService } from './services/stadiums.service';
import { DistrictsComponent } from './components/districts/districts.component';
import { DistrictsService } from './services/districts.service';
import { DistrictsListComponent } from './components/districts/districts-list/districts-list.component';
import { AddUpdateDistrictComponent } from './components/districts/add-update-district/add-update-district.component';
import { SchoolsComponent } from './components/schools/schools.component';
import { SchoolsListComponent } from './components/schools/schools-list/schools-list.component';
import { AddUpdateSchoolComponent } from './components/schools/add-update-school/add-update-school.component';
import { SchoolsService } from './services/schools.service';



@NgModule({
    declarations: [
        SportsComponent,
        SettingsComponent,
        AddUpdateSportComponent,
        UsersComponent,
        AddUpdateUserComponent,
        StadiumsComponent,
        AddUpdateStadiumComponent,
        DistrictsComponent,
        DistrictsListComponent,
        AddUpdateDistrictComponent,
        SchoolsComponent,
        SchoolsListComponent,
        AddUpdateSchoolComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        FormlyMaterialModule,
        ModalModule.forRoot()
    ],
    providers: [
        SportsService,
        UsersService,
        StadiumsService,
        DistrictsService,
        SchoolsService
    ],
    entryComponents: [
        SportsComponent,
        AddUpdateSportComponent,
        AddUpdateUserComponent,
        AddUpdateStadiumComponent
    ],
  })
  export class SettingsModule { }
