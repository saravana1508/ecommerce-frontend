import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Product {
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
  brand: string;
  inStock: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent {
  selectedCategory = 'All';
  selectedSort = 'popular';
  priceRange = 50000;
  minRating = 0;
  viewMode: 'grid' | 'list' = 'grid';

  categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Beauty', 'Books'];

  brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Puma', 'Lakme', 'Penguin'];

  selectedBrands: string[] = [];

  sortOptions = [
    { value: 'popular',   label: 'Most Popular' },
    { value: 'newest',    label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating',    label: 'Top Rated' },
  ];

  allProducts: Product[] = [
    { id: 1,  name: 'iPhone 16 Pro Max',               price: 134900, originalPrice: 144900, rating: 4.8, reviews: 3241, emoji: '📱', color: '#1e3a5f', badge: 'New',         category: 'Electronics', brand: 'Apple',   inStock: true  },
    { id: 2,  name: 'Samsung Galaxy S25 Ultra',         price: 119999, originalPrice: 134999, rating: 4.7, reviews: 2198, emoji: '📲', color: '#0369a1', badge: 'Top Rated',   category: 'Electronics', brand: 'Samsung', inStock: true  },
    { id: 3,  name: 'Sony WH-1000XM5 Headphones',      price: 24990,  originalPrice: 34990,  rating: 4.9, reviews: 5623, emoji: '🎧', color: '#1f2937', badge: '28% OFF',     category: 'Electronics', brand: 'Apple',   inStock: true  },
    { id: 4,  name: 'Apple MacBook Air M3',             price: 99900,  originalPrice: 112900, rating: 4.8, reviews: 1432, emoji: '💻', color: '#374151', badge: 'Best Seller', category: 'Electronics', brand: 'Apple',   inStock: true  },
    { id: 5,  name: 'Nike Air Max 270',                 price: 9995,   originalPrice: 12995,  rating: 4.5, reviews: 876,  emoji: '👟', color: '#dc2626', badge: '23% OFF',     category: 'Sports',      brand: 'Nike',    inStock: true  },
    { id: 6,  name: 'Adidas Ultraboost 24',             price: 14999,  originalPrice: 17999,  rating: 4.4, reviews: 612,  emoji: '🏃', color: '#059669', badge: '',            category: 'Sports',      brand: 'Adidas',  inStock: true  },
    { id: 7,  name: 'Puma Running Shorts',              price: 1299,   originalPrice: 1999,   rating: 4.1, reviews: 342,  emoji: '🩳', color: '#7c3aed', badge: '35% OFF',     category: 'Fashion',     brand: 'Puma',    inStock: false },
    { id: 8,  name: 'Lakme Absolute Foundation',        price: 799,    originalPrice: 999,    rating: 4.3, reviews: 2341, emoji: '💄', color: '#be185d', badge: '',            category: 'Beauty',      brand: 'Lakme',   inStock: true  },
    { id: 9,  name: 'Floral Print Maxi Dress',          price: 1499,   originalPrice: 2499,   rating: 4.0, reviews: 189,  emoji: '👗', color: '#ec4899', badge: 'Trending',    category: 'Fashion',     brand: 'Adidas',  inStock: true  },
    { id: 10, name: 'Premium Chef\'s Knife Set',        price: 2199,   originalPrice: 3499,   rating: 4.6, reviews: 567,  emoji: '🔪', color: '#b45309', badge: '',            category: 'Home & Kitchen', brand: 'Puma', inStock: true  },
    { id: 11, name: 'Penguin Classic Book Set (10 vols)', price: 1999,  originalPrice: 3200,  rating: 4.7, reviews: 890,  emoji: '📚', color: '#0f172a', badge: '37% OFF',     category: 'Books',       brand: 'Penguin', inStock: true  },
    { id: 12, name: 'Yoga Mat + Gym Bag Combo',         price: 1249,   originalPrice: 2499,   rating: 4.5, reviews: 1103, emoji: '🧘', color: '#7c3aed', badge: '50% OFF',     category: 'Sports',      brand: 'Nike',    inStock: true  },
  ];

  get filteredProducts(): Product[] {
    return this.allProducts.filter(p => {
      const catMatch    = this.selectedCategory === 'All' || p.category === this.selectedCategory;
      const priceMatch  = p.price <= this.priceRange;
      const ratingMatch = p.rating >= this.minRating;
      const brandMatch  = this.selectedBrands.length === 0 || this.selectedBrands.includes(p.brand);
      return catMatch && priceMatch && ratingMatch && brandMatch;
    });
  }

  toggleBrand(brand: string): void {
    const idx = this.selectedBrands.indexOf(brand);
    if (idx > -1) {
      this.selectedBrands.splice(idx, 1);
    } else {
      this.selectedBrands.push(brand);
    }
  }

  isBrandSelected(brand: string): boolean {
    return this.selectedBrands.includes(brand);
  }

  resetFilters(): void {
    this.selectedCategory = 'All';
    this.selectedSort     = 'popular';
    this.priceRange       = 50000;
    this.minRating        = 0;
    this.selectedBrands   = [];
  }

  getDiscount(price: number, original: number): number {
    return Math.round(((original - price) / original) * 100);
  }

  getStarArray(rating: number): string {
    const full  = Math.floor(rating);
    const stars = '★'.repeat(full) + (rating % 1 >= 0.5 ? '⯨' : '') + '☆'.repeat(5 - Math.ceil(rating));
    return stars;
  }
}
