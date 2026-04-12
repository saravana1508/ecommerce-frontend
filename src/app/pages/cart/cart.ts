import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  emoji: string;
  color: string;
  quantity: number;
  size?: string;
  category: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  cartItems: CartItem[] = [
    { id: 1, name: 'Sony WH-1000XM5 Headphones', price: 24990,  originalPrice: 34990,  emoji: '🎧', color: '#1f2937', quantity: 1, category: 'Electronics' },
    { id: 2, name: 'Nike Air Max 270',             price: 9995,   originalPrice: 12995,  emoji: '👟', color: '#dc2626', quantity: 2, size: 'UK 9', category: 'Sports' },
    { id: 3, name: 'Floral Print Maxi Dress',      price: 1499,   originalPrice: 2499,   emoji: '👗', color: '#ec4899', quantity: 1, size: 'M', category: 'Fashion' },
  ];

  couponCode = '';
  couponApplied = false;
  couponDiscount = 0;

  deliveryCharge = 0; // Free delivery

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get totalDiscount(): number {
    const cartDiscount = this.cartItems.reduce(
      (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
      0
    );
    return cartDiscount + this.couponDiscount;
  }

  get total(): number {
    return this.subtotal - this.couponDiscount + this.deliveryCharge;
  }

  get totalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  increaseQty(item: CartItem): void {
    if (item.quantity < 10) item.quantity++;
  }

  decreaseQty(item: CartItem): void {
    if (item.quantity > 1) item.quantity--;
  }

  removeItem(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  applyCoupon(): void {
    const validCoupons: Record<string, number> = {
      'SAVE10': Math.round(this.subtotal * 0.10),
      'FLAT200': 200,
      'SHOPEASE': Math.round(this.subtotal * 0.15),
    };
    if (validCoupons[this.couponCode.toUpperCase()]) {
      this.couponDiscount = validCoupons[this.couponCode.toUpperCase()];
      this.couponApplied = true;
    }
  }

  removeCoupon(): void {
    this.couponCode    = '';
    this.couponApplied = false;
    this.couponDiscount = 0;
  }

  getDiscount(price: number, original: number): number {
    return Math.round(((original - price) / original) * 100);
  }
}
