import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

interface InventoryItem {
  id: string;
  productName: string;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  threshold: number;
  category: string;
  lastUpdated: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class InventoryComponent {
  Math = Math; // Expose Math object to template

  inventoryItems: InventoryItem[] = [
    {
      id: 'INV001',
      productName: 'Wireless Headphones',
      stock: 45,
      threshold: 20,
      status: 'in-stock',
      category: 'Electronics',
      lastUpdated: '2 hours ago',
    },
    {
      id: 'INV002',
      productName: 'USB-C Cable (1m)',
      stock: 3,
      threshold: 10,
      status: 'low-stock',
      category: 'Accessories',
      lastUpdated: '5 hours ago',
    },
    {
      id: 'INV003',
      productName: 'Phone Case Leather',
      stock: 8,
      threshold: 15,
      status: 'low-stock',
      category: 'Accessories',
      lastUpdated: '1 hour ago',
    },
    {
      id: 'INV004',
      productName: 'Screen Protector Pack',
      stock: 0,
      threshold: 10,
      status: 'out-of-stock',
      category: 'Accessories',
      lastUpdated: '30 mins ago',
    },
    {
      id: 'INV005',
      productName: 'Portable Power Bank',
      stock: 2,
      threshold: 5,
      status: 'low-stock',
      category: 'Electronics',
      lastUpdated: '3 hours ago',
    },
    {
      id: 'INV006',
      productName: 'Laptop Stand Metal',
      stock: 62,
      threshold: 15,
      status: 'in-stock',
      category: 'Office',
      lastUpdated: '8 hours ago',
    },
    {
      id: 'INV007',
      productName: 'Wireless Mouse',
      stock: 1,
      threshold: 10,
      status: 'low-stock',
      category: 'Electronics',
      lastUpdated: '4 hours ago',
    },
    {
      id: 'INV008',
      productName: 'USB Hub 4-Port',
      stock: 35,
      threshold: 10,
      status: 'in-stock',
      category: 'Accessories',
      lastUpdated: '6 hours ago',
    },
  ];

  // Summary stats
  get totalItems(): number {
    return this.inventoryItems.length;
  }

  get totalStock(): number {
    return this.inventoryItems.reduce((sum, item) => sum + item.stock, 0);
  }

  get lowStockCount(): number {
    return this.inventoryItems.filter(item => item.status === 'low-stock').length;
  }

  get outOfStockCount(): number {
    return this.inventoryItems.filter(item => item.status === 'out-of-stock').length;
  }
}
