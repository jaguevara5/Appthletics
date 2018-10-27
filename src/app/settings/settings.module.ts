import { NgModule } from '@angular/core';

// Modules
import { MyMaterialModule } from '../shared/my-material.module';

// Components
import { SportsComponent } from './sports/sports.component';
import { SettingsComponent } from './settings.component';


@NgModule({
    declarations: [
        SportsComponent,
        SettingsComponent
    ],
    imports: [
        MyMaterialModule
    ],
    providers: []
  })
  export class SettingsModule { }
