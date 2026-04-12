import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { ProductsComponent } from './pages/products/products';
import { CartComponent } from './pages/cart/cart';
import { WishlistComponent } from './pages/wishlist/wishlist';
import { OrdersComponent } from './pages/orders/orders';

export const routes: Routes = [
  { path: '',         component: HomeComponent },
  { path: 'login',    component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart',     component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'orders',   component: OrdersComponent },
  { path: '**',       redirectTo: '', pathMatch: 'full' },
];