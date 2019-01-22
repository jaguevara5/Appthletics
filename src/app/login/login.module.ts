import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { LoginComponent } from './login.component';

// Services
import { LoginService } from './login.service';

@NgModule({
declarations: [
    LoginComponent
],
imports: [
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule
],
providers: [
    LoginService
]
})
export class LoginModule { }
