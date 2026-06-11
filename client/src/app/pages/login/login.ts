import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  email = '';
  password = '';

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password.';
      return;
    }

    this.isLoading = true;

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.authService.saveAuthData(response);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Login failed.';
        this.isLoading = false;
      }
    });
  }
}