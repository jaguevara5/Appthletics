import { NgModule } from '@angular/core';

// Modules
import { MyMaterialModule } from '../shared/my-material.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { SportsComponent } from './sports/sports.component';
import { SettingsComponent } from './settings.component';

// Services
import { SportsService } from './services/sports.service';


@NgModule({
    declarations: [
        SportsComponent,
        SettingsComponent
    ],
    imports: [
        HttpClientModule,
        MyMaterialModule
    ],
    providers: [
        SportsService
    ]
  })
  export class SettingsModule { }
