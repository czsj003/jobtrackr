import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  name = '';
  email = '';
  password = '';

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    this.isLoading = true;

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.authService.saveAuthData(response);
        this.successMessage = 'Account created successfully.';
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Registration failed.';
        this.isLoading = false;
      }
    });
  }
}