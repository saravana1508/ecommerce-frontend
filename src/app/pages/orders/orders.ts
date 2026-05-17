import { Component, inject, OnInit } from '@angular/core';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService, Order, OrderStatus } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  activeTab: OrderStatus | 'All' = 'All';
  tabs: (OrderStatus | 'All')[] = ['All', 'Delivered', 'Shipped', 'Processing', 'Cancelled', 'Returned'];
  orders: Order[] = [];

  // Return Modal State
  showReturnModal = false;
  returningOrderId: string | null = null;
  returnReason = '';
  returnComment = '';
  returnReasonsList = [
    'Item defective or doesn\'t work',
    'Bought by mistake',
    'Better price available',
    'Product and shipping box both damaged',
    'Item arrived too late',
    'Missing parts or accessories',
    'Inaccurate website description',
    'No longer needed'
  ];

  ngOnInit() {
    this.orders = this.orderService.getOrders();
  }

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

  // --- Return Flow Methods ---

  canReturn(status: OrderStatus): boolean {
    return status === 'Delivered' || status === 'Shipped';
  }

  openReturnModal(orderId: string) {
    this.returningOrderId = orderId;
    this.returnReason = '';
    this.returnComment = '';
    this.showReturnModal = true;
  }

  closeReturnModal() {
    this.showReturnModal = false;
    this.returningOrderId = null;
  }

  submitReturn() {
    if (!this.returningOrderId || !this.returnReason) return;
    
    this.orderService.updateOrderStatus(this.returningOrderId, 'Returned', this.returnReason, this.returnComment);
    // Re-fetch to ensure reactivity if needed, though reference is the same
    this.orders = this.orderService.getOrders();
    this.closeReturnModal();
  }
}
