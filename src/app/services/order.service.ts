import { Injectable } from '@angular/core';

export type OrderStatus = 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled' | 'Returned';

export interface OrderItem {
  name: string;
  emoji: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  address: string;
  paymentMethod: string;
  trackingId?: string;
  returnReason?: string;
  returnComment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    {
      id: 'ORD-2025-00128',
      date: '10 Apr 2025',
      status: 'Delivered',
      items: [
        { name: 'Sony WH-1000XM5 Headphones', emoji: '🎧', qty: 1, price: 24990 },
        { name: 'Floral Print Maxi Dress',      emoji: '👗', qty: 1, price: 1499  },
      ],
      total: 26489,
      address: '42, MG Road, Bengaluru, Karnataka 560001',
      paymentMethod: 'UPI (Google Pay)',
      trackingId: 'DTDC-9921884',
    },
    {
      id: 'ORD-2025-00121',
      date: '03 Apr 2025',
      status: 'Shipped',
      items: [
        { name: 'Nike Air Max 270', emoji: '👟', qty: 2, price: 19990 },
      ],
      total: 19990,
      address: '8, Anna Salai, Chennai, Tamil Nadu 600002',
      paymentMethod: 'Credit Card (HDFC)',
      trackingId: 'BLUEDART-88341',
    },
    {
      id: 'ORD-2025-00114',
      date: '26 Mar 2025',
      status: 'Processing',
      items: [
        { name: 'Apple MacBook Air M3',     emoji: '💻', qty: 1, price: 99900 },
        { name: 'Smart Watch Series 9',     emoji: '⌚', qty: 1, price: 18999 },
      ],
      total: 118899,
      address: '22, Jubilee Hills, Hyderabad, Telangana 500033',
      paymentMethod: 'Net Banking (SBI)',
    },
    {
      id: 'ORD-2025-00098',
      date: '15 Mar 2025',
      status: 'Cancelled',
      items: [
        { name: 'Penguin Classic Book Set', emoji: '📚', qty: 1, price: 1999 },
      ],
      total: 1999,
      address: '5, Park Street, Kolkata, West Bengal 700016',
      paymentMethod: 'Debit Card (Axis)',
    },
    {
      id: 'ORD-2025-00083',
      date: '28 Feb 2025',
      status: 'Returned',
      items: [
        { name: 'Yoga Mat + Gym Bag Combo', emoji: '🧘', qty: 1, price: 1249 },
      ],
      total: 1249,
      address: '17, Civil Lines, Pune, Maharashtra 411001',
      paymentMethod: 'Wallet (Paytm)',
    },
  ];

  getOrders(): Order[] {
    return this.orders;
  }

  addOrder(order: Order): void {
    // Add to the top of the list
    this.orders.unshift(order);
  }

  updateOrderStatus(orderId: string, status: OrderStatus, returnReason?: string, returnComment?: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      if (returnReason) order.returnReason = returnReason;
      if (returnComment) order.returnComment = returnComment;
    }
  }
}
