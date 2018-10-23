import { NgModule } from '@angular/core';

// Modules
import { MyMaterialModule } from '../shared/my-material.module';

// Components
import { SportsComponent } from './sports/sports.component';


@NgModule({
    declarations: [
        SportsComponent
    ],
    imports: [
        MyMaterialModule
    ],
    providers: []
  })
  export class SettingsModule { }
