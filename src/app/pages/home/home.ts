import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  emoji: string;
  color: string;
  badge?: string;
  category: string;
}

interface Category {
  name: string;
  emoji: string;
  color: string;
  count: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  categories: Category[] = [
    { name: 'Electronics',    emoji: '📱', color: '#3b82f6', count: '12,000+ items' },
    { name: 'Fashion',        emoji: '👗', color: '#ec4899', count: '45,000+ items' },
    { name: 'Home & Kitchen', emoji: '🏠', color: '#10b981', count: '8,500+ items' },
    { name: 'Books',          emoji: '📚', color: '#f59e0b', count: '25,000+ items' },
    { name: 'Sports',         emoji: '⚽', color: '#ef4444', count: '5,200+ items' },
    { name: 'Beauty',         emoji: '💄', color: '#8b5cf6', count: '7,800+ items' },
  ];

  featuredProducts: Product[] = [
    { id: 1,  name: 'Wireless Bluetooth Headphones', price: 2499,  originalPrice: 4999,  rating: 4.5, reviews: 1243, emoji: '🎧', color: '#1e3a5f', badge: '50% OFF', category: 'Electronics' },
    { id: 2,  name: 'Smart Watch Series 9',          price: 18999, originalPrice: 24999, rating: 4.7, reviews: 876,  emoji: '⌚', color: '#7c3aed', badge: 'Trending', category: 'Electronics' },
    { id: 3,  name: 'Running Sports Shoes',          price: 1799,  originalPrice: 3499,  rating: 4.3, reviews: 527,  emoji: '👟', color: '#059669', badge: 'Best Seller', category: 'Sports' },
    { id: 4,  name: 'Casual Cotton Kurta Set',       price: 899,   originalPrice: 1499,  rating: 4.1, reviews: 312,  emoji: '👘', color: '#dc2626', badge: 'New',        category: 'Fashion' },
  ];

  newArrivals: Product[] = [
    { id: 5,  name: '4K OLED Smart TV 55"',        price: 54999, originalPrice: 74999, rating: 4.8, reviews: 234,  emoji: '📺', color: '#0f172a', badge: 'New', category: 'Electronics' },
    { id: 6,  name: 'Stainless Steel Water Bottle', price: 399,   originalPrice: 699,   rating: 4.4, reviews: 1890, emoji: '🍶', color: '#0369a1', category: 'Home' },
    { id: 7,  name: 'Yoga Mat Premium',             price: 649,   originalPrice: 999,   rating: 4.6, reviews: 445,  emoji: '🧘', color: '#7c3aed', category: 'Sports' },
    { id: 8,  name: 'Moisturizing Face Cream',      price: 349,   originalPrice: 549,   rating: 4.2, reviews: 738,  emoji: '🧴', color: '#be185d', category: 'Beauty' },
  ];

  getDiscount(price: number, original: number): number {
    return Math.round(((original - price) / original) * 100);
  }

  getStarArray(rating: number): string[] {
    const stars: string[] = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < full; i++) stars.push('full');
    if (half) stars.push('half');
    while (stars.length < 5) stars.push('empty');
    return stars;
  }
}
