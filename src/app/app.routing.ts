import { Route } from '@angular/router';
import { AreaShopListComponent } from './pages/area-shop-list/area-shop-list.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: UserHomeComponent },
  { path: 'area-list', pathMatch: 'full', component: AreaShopListComponent },
];
