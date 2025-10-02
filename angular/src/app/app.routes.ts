import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/products/product.routes').then((m) => m.routes),
  },
];
