import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

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



@NgModule({
    declarations: [
        SportsComponent,
        SettingsComponent,
        AddUpdateSportComponent,
        UsersComponent,
        AddUpdateUserComponent,
        StadiumsComponent,
        AddUpdateStadiumComponent
    ],
    imports: [
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        FormlyMaterialModule
    ],
    providers: [
        SportsService,
        UsersService,
        StadiumsService
    ],
    entryComponents: [
        SportsComponent,
        AddUpdateSportComponent,
        AddUpdateUserComponent,
        AddUpdateStadiumComponent
    ],
  })
  export class SettingsModule { }
