import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { ProductsComponent } from './pages/products/products';
import { CartComponent } from './pages/cart/cart';
import { WishlistComponent } from './pages/wishlist/wishlist';
import { OrdersComponent } from './pages/orders/orders';
import { CheckoutComponent } from './pages/checkout/checkout';
import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { AdminComponent } from './pages/admin/admin';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard';
import { ShippingPartnerComponent } from './pages/admin/shipping-partner/shipping-partner';
import { InventoryComponent } from './pages/admin/inventory/inventory';

export const routes: Routes = [
  { path: '',         component: HomeComponent },
  { path: 'login',    component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart',     component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'orders',   component: OrdersComponent },
  
  // Admin routes
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'shipping-partner', component: ShippingPartnerComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  
  { path: '**',       redirectTo: '', pathMatch: 'full' },
];