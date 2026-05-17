import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);

  email = '';
  password = '';
  role = 'user';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  // Sample credentials
  private readonly ADMIN_EMAIL = 'admin@example.com';
  private readonly ADMIN_PASSWORD = 'Admin@123';
  private readonly USER_EMAIL = 'user@example.com';
  private readonly USER_PASSWORD = 'User@123';

  /** Login validation and routing */
  onLogin(): void {
    if (!this.email || !this.password) return;

    this.errorMessage = '';
    this.isLoading = true;

    // Simulate a network request
    setTimeout(() => {
      this.isLoading = false;

      // Admin credentials validation
      if (this.email === this.ADMIN_EMAIL && this.password === this.ADMIN_PASSWORD) {
        console.log('Admin login successful');
        this.router.navigate(['/admin']);
      }
      // User credentials validation
      else if (this.email === this.USER_EMAIL && this.password === this.USER_PASSWORD) {
        console.log('User login successful');
        this.router.navigate(['/']);
      }
      // Invalid credentials
      else {
        this.errorMessage = 'Invalid email or password. Please try again.';
        console.log('Login failed: Invalid credentials');
      }
    }, 1400);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
