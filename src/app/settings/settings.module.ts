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

// Services
import { SportsService } from './services/sports.service';
import { UsersService } from './services/users.service';



@NgModule({
    declarations: [
        SportsComponent,
        SettingsComponent,
        AddUpdateSportComponent,
        UsersComponent,
        AddUpdateUserComponent
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
        UsersService
    ],
    entryComponents: [
        SportsComponent,
        AddUpdateSportComponent,
        AddUpdateUserComponent
    ],
  })
  export class SettingsModule { }
