import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Applications } from './pages/applications/applications';
import { ApplicationForm } from './pages/application-form/application-form';
import { ApplicationDetail } from './pages/application-detail/application-detail';
import { CompanyHistory } from './pages/company-history/company-history';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard]
    },
    {
        path: 'applications',
        component: Applications,
        canActivate: [authGuard]
    },
    {
        path: 'applications/new',
        component: ApplicationForm,
        canActivate: [authGuard]
    },
    {
        path: 'applications/:id',
        component: ApplicationDetail,
        canActivate: [authGuard]
    },
    {
        path: 'applications/:id/edit',
        component: ApplicationForm,
        canActivate: [authGuard]
    },
    {
        path: 'companies/:companyName',
        component: CompanyHistory,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];