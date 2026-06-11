import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import {
  ApplicationService,
  CompanyHistoryResponse
} from '../../core/services/application';

@Component({
  selector: 'app-company-history',
  imports: [Navbar, CommonModule, RouterLink],
  templateUrl: './company-history.html',
  styleUrl: './company-history.css'
})
export class CompanyHistory implements OnInit {
  companyName = '';
  history: CompanyHistoryResponse | null = null;

  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    const companyName = this.route.snapshot.paramMap.get('companyName');

    if (!companyName) {
      this.errorMessage = 'Company name is missing.';
      return;
    }

    this.companyName = companyName;
    this.loadCompanyHistory(companyName);
  }

  loadCompanyHistory(companyName: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.applicationService.getCompanyHistory(companyName).subscribe({
      next: (response) => {
        this.history = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load company history.';
        this.isLoading = false;
      }
    });
  }

  formatDate(dateString: string | null): string {
    if (!dateString) {
      return 'No previous applications';
    }

    return dateString.slice(0, 10);
  }

  getWarningTitle(): string {
    if (!this.history || this.history.daysSinceLastApplied === null) {
      return 'No Previous Applications';
    }

    const days = this.history.daysSinceLastApplied;

    if (days <= 30) {
      return 'Recent Application Warning';
    }

    if (days <= 60) {
      return 'Recent Application Notice';
    }

    return 'Application History Notice';
  }

  getWarningMessage(): string {
    if (!this.history || this.history.daysSinceLastApplied === null) {
      return 'You have not applied to this company before.';
    }

    const days = this.history.daysSinceLastApplied;
    const recentRole = this.history.recentApplication?.position;

    if (days <= 30) {
      return `You applied to this company ${days} day(s) ago for ${recentRole}. Consider waiting before applying again.`;
    }

    if (days <= 60) {
      return `You applied to this company within the last 2 months. Last application was ${days} day(s) ago.`;
    }

    return `It has been ${days} day(s) since your last application. You may consider applying again.`;
  }

  getWarningClass(): string {
    if (!this.history || this.history.daysSinceLastApplied === null) {
      return 'neutral';
    }

    const days = this.history.daysSinceLastApplied;

    if (days <= 30) {
      return 'danger';
    }

    if (days <= 60) {
      return 'warning';
    }

    return 'safe';
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}