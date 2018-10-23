import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SportsComponent } from './settings/sports/sports.component';


const appRoutes: Routes = [
    {
        path: 'settings/sports',
        component: SportsComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
