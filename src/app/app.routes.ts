import { Routes } from '@angular/router';
import { authGuard } from './guard/auth-guard.guard';
import { HomePage } from './component/homepage/home-page.component';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   canActivate: [authGuard]
  // },
  // {
  //   path: 'retailer',
  //   component: RetailerListComponent,
  //   canActivate: [authGuard]
  // },
  {
    path: '**',
    component: HomePage,
  },
  {
    path: '**', // Wildcard route
    redirectTo: 'retailer',
  },
];
