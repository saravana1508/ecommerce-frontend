import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, RouterLinkActive } from '@angular/router';
import { NgClass, NgIf, NgFor } from '@angular/common';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass, NgIf, NgFor],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent {
  sidebarOpen = true;
  currentUser = 'Admin User';
  currentTime = new Date();

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/admin/dashboard' },
    { label: 'Shipping Partner', icon: '🚚', route: '/admin/shipping-partner', badge: 3 },
    { label: 'Inventory', icon: '📦', route: '/admin/inventory', badge: 5 },
  ];

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onLogout(): void {
    localStorage.removeItem('adminSession');
    this.router.navigate(['/admin-login']);
  }
}
