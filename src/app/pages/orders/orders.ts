import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

type OrderStatus = 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled' | 'Returned';

interface OrderItem {
  name: string;
  emoji: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  address: string;
  paymentMethod: string;
  trackingId?: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgClass],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class OrdersComponent {
  activeTab: OrderStatus | 'All' = 'All';

  tabs: (OrderStatus | 'All')[] = ['All', 'Delivered', 'Shipped', 'Processing', 'Cancelled', 'Returned'];

  orders: Order[] = [
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

  get filteredOrders(): Order[] {
    if (this.activeTab === 'All') return this.orders;
    return this.orders.filter(o => o.status === this.activeTab);
  }

  getStatusBadgeClass(status: OrderStatus): string {
    const map: Record<OrderStatus, string> = {
      Delivered:  'badge-success',
      Shipped:    'badge-info',
      Processing: 'badge-warning',
      Cancelled:  'badge-error',
      Returned:   'badge-primary',
    };
    return map[status] ?? 'badge-primary';
  }

  getStatusIcon(status: OrderStatus): string {
    const map: Record<OrderStatus, string> = {
      Delivered:  '✅',
      Shipped:    '🚚',
      Processing: '⏳',
      Cancelled:  '❌',
      Returned:   '↩️',
    };
    return map[status] ?? '📦';
  }

  getTabCount(tab: OrderStatus | 'All'): number {
    if (tab === 'All') return this.orders.length;
    return this.orders.filter(o => o.status === tab).length;
  }
}
