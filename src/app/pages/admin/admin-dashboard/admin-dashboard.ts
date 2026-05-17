import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

interface DashboardStat {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
  trendUp?: boolean;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent {
  hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
  }

  stats: DashboardStat[] = [
    {
      label: 'Total Shipping Partners',
      value: 24,
      icon: '🚚',
      color: '#3b82f6',
      trend: '+3',
      trendUp: true,
    },
    {
      label: 'Active Inventory Items',
      value: 1248,
      icon: '📦',
      color: '#10b981',
      trend: '+125',
      trendUp: true,
    },
    {
      label: 'Low Stock Items',
      value: 18,
      icon: '⚠️',
      color: '#f59e0b',
      trend: '+5',
      trendUp: false,
    },
    {
      label: 'Total Orders',
      value: '5,432',
      icon: '📊',
      color: '#8b5cf6',
      trend: '+284',
      trendUp: true,
    },
  ];

  recentActivities = [
    { action: 'New shipping partner added', time: '2 hours ago', icon: '✅' },
    { action: 'Inventory stock update', time: '4 hours ago', icon: '📦' },
    { action: 'Low stock alert triggered', time: '6 hours ago', icon: '⚠️' },
    { action: 'Partner status updated', time: '1 day ago', icon: '🔄' },
  ];
}
