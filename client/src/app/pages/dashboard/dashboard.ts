import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { AuthService } from '../../core/services/auth';
import {
  DashboardService,
  DashboardStats
} from '../../core/services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  user: any = null;

  stats: DashboardStats = {
    totalApplications: 0,
    saved: 0,
    applied: 0,
    interviewing: 0,
    offers: 0,
    rejected: 0,
    interviewRate: 0,
    offerRate: 0,
    rejectionRate: 0
  };

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.verifyUser();
    this.loadStats();
  }

  verifyUser(): void {
    this.authService.getMe().subscribe({
      next: (response) => {
        this.user = response.user;
        this.authService.saveUser(response.user);
      },
      error: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  loadStats(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.dashboardService.getStats().subscribe({
      next: (response) => {
        this.stats = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load dashboard stats.';
        this.isLoading = false;
      }
    });
  }
}