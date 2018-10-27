import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SettingsModule } from './settings/settings.module';
import { LoginComponent } from './login/login.component';
import { MyMaterialModule } from './shared/my-material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    SettingsModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
