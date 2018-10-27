import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SportsComponent } from './settings/sports/sports.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const appRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'settings/sports',
        component: SportsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
