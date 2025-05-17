import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RetailerListComponent } from './component/retailer/retailer-list/retailer-list.component';
import { authGuard } from './guard/auth-guard.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: 'retailer',
    component: RetailerListComponent,
    canActivate: [authGuard]
  },
  {
    path: '**', // Wildcard route
    redirectTo: 'retailer',
  },
];
