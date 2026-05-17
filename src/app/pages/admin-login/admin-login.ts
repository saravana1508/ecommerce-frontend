import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;

  constructor(private router: Router) {}

  /** Dummy admin login — sample credentials: admin@example.com / Admin@123 */
  onLogin(): void {
    if (!this.email || !this.password) return;
    
    this.isLoading = true;
    
    setTimeout(() => {
      if (this.email === 'admin@example.com' && this.password === 'Admin@123') {
        // Store admin session (mock)
        localStorage.setItem('adminSession', 'true');
        this.router.navigate(['/admin/dashboard']);
      } else {
        alert('Invalid credentials. Use admin@example.com / Admin@123');
      }
      this.isLoading = false;
    }, 1400);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
