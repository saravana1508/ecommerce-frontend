import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

interface ShippingPartner {
  id: string;
  name: string;
  mobile: string;
  isActive: boolean;
}

@Component({
  selector: 'app-shipping-partner',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './shipping-partner.html',
  styleUrl: './shipping-partner.css',
})
export class ShippingPartnerComponent {
  // Form fields
  partnerId = '';
  partnerName = '';
  mobileNumber = '';
  isActive = true;

  // Partners list with mock data
  partners: ShippingPartner[] = [
    { id: 'SP001', name: 'FastShip Logistics', mobile: '+91 9876543210', isActive: true },
    { id: 'SP002', name: 'ExpressDeliver Co.', mobile: '+91 9123456789', isActive: true },
    { id: 'SP003', name: 'QuickMove Services', mobile: '+91 8765432109', isActive: false },
  ];

  editingId: string | null = null;

  onAddPartner(): void {
    if (!this.partnerId || !this.partnerName || !this.mobileNumber) {
      alert('Please fill all fields');
      return;
    }

    if (this.editingId) {
      const partner = this.partners.find(p => p.id === this.editingId);
      if (partner) {
        partner.name = this.partnerName;
        partner.mobile = this.mobileNumber;
        partner.isActive = this.isActive;
        this.editingId = null;
      }
    } else {
      this.partners.push({
        id: this.partnerId,
        name: this.partnerName,
        mobile: this.mobileNumber,
        isActive: this.isActive,
      });
    }

    this.resetForm();
  }

  onEditPartner(partner: ShippingPartner): void {
    this.partnerId = partner.id;
    this.partnerName = partner.name;
    this.mobileNumber = partner.mobile;
    this.isActive = partner.isActive;
    this.editingId = partner.id;
  }

  onDeletePartner(id: string): void {
    if (confirm('Are you sure you want to delete this partner?')) {
      this.partners = this.partners.filter(p => p.id !== id);
    }
  }

  resetForm(): void {
    this.partnerId = '';
    this.partnerName = '';
    this.mobileNumber = '';
    this.isActive = true;
    this.editingId = null;
  }
}
