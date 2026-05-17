import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class CheckoutComponent {
  private orderService = inject(OrderService);

  // Checkout Steps State (1=Address, 2=Payment, 3=Review, 4=Success)
  activeStep: number = 1;

  // 1. Delivery Address State
  addresses = [
    { id: 1, name: 'John Doe', street: '123 E-commerce St, Apt 4B', city: 'Techville', state: 'Karnataka', pin: '560001', phone: '9876543210', type: 'Home' },
    { id: 2, name: 'John Doe', street: '456 Business Rd, Floor 2', city: 'Innovate City', state: 'Maharashtra', pin: '400001', phone: '9876543210', type: 'Work' }
  ];
  selectedAddressId: number = 1;

  // 2. Payment Method State
  paymentMethods = [
    { id: 'upi', name: 'UPI', description: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit or debit card', description: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', description: 'All major banks supported' },
    { id: 'cod', name: 'Cash on Delivery (COD)', description: 'Pay when your order is delivered' }
  ];
  selectedPaymentMethod: string = 'upi';

  // 3. Order Items Summary (Mocked for demonstration, normally from a CartService)
  orderItems = [
    { id: 1, name: 'Sony WH-1000XM5 Headphones', price: 24990, quantity: 1, imgColor: '#1f2937', emoji: '🎧' },
    { id: 2, name: 'Nike Air Max 270', price: 9995, quantity: 2, imgColor: '#dc2626', emoji: '👟' },
    { id: 3, name: 'Floral Print Maxi Dress', price: 1499, quantity: 1, imgColor: '#ec4899', emoji: '👗' }
  ];

  deliveryCharge = 0; // Free delivery

  get subtotal(): number {
    return this.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get totalItems(): number {
    return this.orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalAmount(): number {
    return this.subtotal + this.deliveryCharge;
  }

  get selectedAddress() {
    return this.addresses.find(a => a.id === this.selectedAddressId);
  }

  get selectedPayment() {
    return this.paymentMethods.find(p => p.id === this.selectedPaymentMethod);
  }

  setStep(step: number) {
    if (this.activeStep === 4) return; // Don't allow going back once successful
    this.activeStep = step;
  }

  useThisAddress() {
    this.activeStep = 2; // Move to Payment
  }

  useThisPaymentMethod() {
    this.activeStep = 3; // Move to Review
  }

  placeOrder() {
    const addr = this.selectedAddress;
    const pay = this.selectedPayment;
    if (!addr || !pay) return;

    const newOrder: Order = {
      id: 'ORD-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Processing',
      items: this.orderItems.map(i => ({ name: i.name, emoji: i.emoji, qty: i.quantity, price: i.price * i.quantity })),
      total: this.totalAmount,
      address: `${addr.street}, ${addr.city}, ${addr.state} ${addr.pin}`,
      paymentMethod: pay.name
    };

    this.orderService.addOrder(newOrder);
    this.activeStep = 4; // Move to Success State
  }
}
