import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import {
  ApplicationService,
  JobApplication
} from '../../core/services/application';

@Component({
  selector: 'app-applications',
  imports: [Navbar, RouterLink, CommonModule, FormsModule],
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class Applications implements OnInit {
  applications: JobApplication[] = [];
  isLoading = false;
  errorMessage = '';

  companySearch = '';
  activeCompanySearch = '';

  statusFilter = 'All';
  activeStatusFilter = 'All';

  statuses = [
    'All',
    'Saved',
    'Applied',
    'Interviewing',
    'Offer',
    'Rejected'
  ];

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(company?: string, status?: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.applicationService.getApplications(company, status).subscribe({
      next: (response) => {
        this.applications = response.applications;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load applications.';
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    const searchValue = this.companySearch.trim();

    this.activeCompanySearch = searchValue;
    this.activeStatusFilter = this.statusFilter;

    this.loadApplications(searchValue, this.statusFilter);
  }

  onStatusChange(): void {
    this.activeStatusFilter = this.statusFilter;
    this.loadApplications(this.activeCompanySearch, this.statusFilter);
  }

  clearSearch(): void {
    this.companySearch = '';
    this.activeCompanySearch = '';
    this.statusFilter = 'All';
    this.activeStatusFilter = 'All';
    this.loadApplications();
  }

  formatDate(dateString: string): string {
    if (!dateString) {
      return '';
    }

    return dateString.slice(0, 10);
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}