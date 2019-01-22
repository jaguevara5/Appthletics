import { Routes } from '@angular/router';
import { SportsComponent } from '../settings/components/sports/sports.component';
import { SettingsComponent } from '../settings/settings.component';
import { AuthGuardService as AuthGuard } from '../login/auth-guard.service';

export const dashBoardRoutes: Routes = [
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings/sports',
        component: SportsComponent,
        canActivate: [AuthGuard]
    }
];
