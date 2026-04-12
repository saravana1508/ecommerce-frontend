import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home',     path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Cart',     path: '/cart' },
    { label: 'Wishlist', path: '/wishlist' },
    { label: 'Orders',   path: '/orders' },
    { label: 'Login',    path: '/login' },
  ];

  categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Books',
    'Sports & Fitness',
    'Beauty & Care',
  ];

  supportLinks = [
    'Help Center',
    'Track Your Order',
    'Return Policy',
    'Privacy Policy',
    'Terms of Service',
    'Contact Us',
  ];
}
