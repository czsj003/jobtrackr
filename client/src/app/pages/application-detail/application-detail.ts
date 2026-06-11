import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import {
  ApplicationService,
  JobApplication
} from '../../core/services/application';

@Component({
  selector: 'app-application-detail',
  imports: [Navbar, RouterLink, CommonModule],
  templateUrl: './application-detail.html',
  styleUrl: './application-detail.css'
})
export class ApplicationDetail implements OnInit {
  application: JobApplication | null = null;
  isLoading = false;
  isDeleting = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Application ID is missing.';
      return;
    }

    this.loadApplication(id);
  }

  loadApplication(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.applicationService.getApplicationById(id).subscribe({
      next: (response) => {
        this.application = response.application;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load application.';
        this.isLoading = false;
      }
    });
  }

  onDelete(): void {
    if (!this.application) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete the application for ${this.application.position} at ${this.application.company}?`
    );

    if (!confirmed) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';

    this.applicationService.deleteApplication(this.application._id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.router.navigate(['/applications']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to delete application.';
        this.isDeleting = false;
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) {
      return '';
    }

    return dateString.slice(0, 10);
  }

  formatSalary(min: number | null, max: number | null): string {
    if (!min && !max) {
      return 'Not provided';
    }

    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    }

    if (min) {
      return `$${min.toLocaleString()}+`;
    }

    return `Up to $${max?.toLocaleString()}`;
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}