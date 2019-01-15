import { Routes } from '@angular/router';
import { SportsComponent } from '../settings/components/sports/sports.component';
import { SettingsComponent } from '../settings/settings.component';

export const dashBoardRoutes: Routes = [
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'settings/sports',
        component: SportsComponent
    }
];
