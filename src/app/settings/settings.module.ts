import { NgModule } from '@angular/core';

// Modules
import { MyMaterialModule } from '../shared/my-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

// Components
import { SettingsComponent } from './settings.component';
import { AddUpdateSportComponent } from './sports/add-update-sport/add-update-sport.component';
import { SportsComponent } from './sports/sports.component';

// Services
import { SportsService } from './services/sports.service';



@NgModule({
    declarations: [
        SportsComponent,
        SettingsComponent,
        AddUpdateSportComponent
    ],
    imports: [
        HttpClientModule,
        MyMaterialModule,
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        FormlyMaterialModule
    ],
    providers: [
        SportsService
    ],
    entryComponents: [SportsComponent, AddUpdateSportComponent],
  })
  export class SettingsModule { }
