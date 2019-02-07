import { Routes } from '@angular/router';
import { SportsComponent } from '../settings/components/sports/sports.component';
import { SettingsComponent } from '../settings/settings.component';
import { AuthGuardService as AuthGuard } from '../login/auth-guard.service';
import { UsersComponent } from '../settings/components/users/users.component';

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
    },
    {
        path: 'settings/users',
        component: UsersComponent,
        canActivate: [AuthGuard]
    }
];
