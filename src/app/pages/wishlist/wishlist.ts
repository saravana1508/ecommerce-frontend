import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface WishlistItem {
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
  inStock: boolean;
}

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class WishlistComponent {
  wishlistItems: WishlistItem[] = [
    { id: 1,  name: 'Apple MacBook Air M3',          price: 99900,  originalPrice: 112900, rating: 4.8, reviews: 1432, emoji: '💻', color: '#374151', badge: 'Best Seller', category: 'Electronics', inStock: true  },
    { id: 2,  name: 'Smart Watch Series 9',           price: 18999,  originalPrice: 24999,  rating: 4.7, reviews: 876,  emoji: '⌚', color: '#7c3aed', badge: 'Trending',    category: 'Electronics', inStock: true  },
    { id: 3,  name: 'Adidas Ultraboost 24',           price: 14999,  originalPrice: 17999,  rating: 4.4, reviews: 612,  emoji: '🏃', color: '#059669', badge: '',            category: 'Sports',      inStock: true  },
    { id: 4,  name: 'Lakme Absolute Foundation',      price: 799,    originalPrice: 999,    rating: 4.3, reviews: 2341, emoji: '💄', color: '#be185d', badge: '',            category: 'Beauty',      inStock: true  },
    { id: 5,  name: 'Penguin Classic Book Set',       price: 1999,   originalPrice: 3200,   rating: 4.7, reviews: 890,  emoji: '📚', color: '#0f172a', badge: '37% OFF',     category: 'Books',       inStock: true  },
    { id: 6,  name: 'Puma Running Shorts',            price: 1299,   originalPrice: 1999,   rating: 4.1, reviews: 342,  emoji: '🩳', color: '#7c3aed', badge: '35% OFF',     category: 'Fashion',     inStock: false },
  ];

  removeItem(id: number): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
  }

  moveToCart(item: WishlistItem): void {
    this.removeItem(item.id);
  }

  getDiscount(price: number, original: number): number {
    return Math.round(((original - price) / original) * 100);
  }
}
