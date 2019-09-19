import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SchedulesComponent } from './schedules.component';

@NgModule({
    declarations: [
        SchedulesComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        ModalModule.forRoot()
    ],
    providers: [],
})
export class SchedulesModule { }
