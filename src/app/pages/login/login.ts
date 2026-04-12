import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email = '';
  password = '';
  role = 'user';
  rememberMe = false;
  showPassword = false;
  isLoading = false;

  /** Dummy login — no API integration */
  onLogin(): void {
    if (!this.email || !this.password) return;
    this.isLoading = true;
    // Simulate a network request
    setTimeout(() => {
      this.isLoading = false;
      console.log('Login attempted as:', this.role, 'with email:', this.email);
    }, 1400);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
