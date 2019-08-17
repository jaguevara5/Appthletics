import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Environment
import { environment } from '../environments/environment';

// NGRX
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SettingsModule } from './settings/settings.module';
import { LoginModule } from './login/login.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SportsEffects } from './settings/effects/sports.effects';

import { ToastrModule } from 'ngx-toastr';
import { UIEffects } from './shared/ui.effects';
import { LoginEffects } from './login/login.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './login/auth-interceptor';
import { AuthGuardService } from './login/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { UsersEffects } from './settings/effects/users.effects';
import { StadiumsEffects } from './settings/effects/stadiums.effects';
import { DistrictsEffects } from './settings/effects/districts.effects';

export function tokenGetter() {
  return localStorage.getItem('appthletics_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    SettingsModule,
    LoginModule,
    BrowserAnimationsModule,
    routing,
    StoreModule.forRoot(appReducers, {}),
    EffectsModule.forRoot([
      SportsEffects,
      UIEffects,
      LoginEffects,
      UsersEffects,
      StadiumsEffects,
      DistrictsEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
