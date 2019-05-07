import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashBoardRoutes } from './dashboard/dashboard.routes';
import { AuthGuardService as AuthGuard } from './login/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: dashBoardRoutes,
        canActivate: [AuthGuard]

    },
    {
        path: 'login',
        component: LoginComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
