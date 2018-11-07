import { NgModule } from '@angular/core';

// Modules
import { MyMaterialModule } from '../shared/my-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

// Components
import { SportsComponent, AddUpdateSportDialog } from './sports/sports.component';
import { SettingsComponent } from './settings.component';

// Services
import { SportsService } from './services/sports.service';


@NgModule({
    declarations: [
        SportsComponent,
        SettingsComponent,
        AddUpdateSportDialog
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
    entryComponents: [SportsComponent, AddUpdateSportDialog],
  })
  export class SettingsModule { }
