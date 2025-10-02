import { Routes } from '@angular/router';
import { ProductAdd } from './components/product-add/product-add';
import { ProductList } from './components/product-list/product-list';

export const routes: Routes = [
  {
    path: 'product-add',
    component: ProductAdd,
  },
  {
    path: '',
    component: ProductList,
  },
];
