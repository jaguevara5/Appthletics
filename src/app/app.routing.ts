import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SportsComponent } from './settings/sports/sports.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashBoardRoutes } from './dashboard/dashboard.routes';


const appRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: dashBoardRoutes
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
