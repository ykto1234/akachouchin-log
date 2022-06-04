import { Route } from '@angular/router';
import { UserHomeComponent } from './pages/user-home/user-home.component';

export const appRoutes: Route[] = [

  { path: '', pathMatch: 'full', component: UserHomeComponent },

];
