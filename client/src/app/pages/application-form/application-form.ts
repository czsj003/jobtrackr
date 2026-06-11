import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import {
  ApplicationService,
  ApplicationData
} from '../../core/services/application';

@Component({
  selector: 'app-application-form',
  imports: [Navbar, RouterLink, FormsModule, CommonModule],
  templateUrl: './application-form.html',
  styleUrl: './application-form.css'
})
export class ApplicationForm implements OnInit {
  applicationId: string | null = null;
  isEditMode = false;

  company = '';
  position = '';
  location = '';
  workType = 'Remote';
  status = 'Applied';
  salaryMin: number | null = null;
  salaryMax: number | null = null;
  jobUrl = '';
  appliedDate = '';
  source = '';
  notes = '';

  errorMessage = '';
  successMessage = '';
  isLoading = false;
  isPageLoading = false;

  constructor(
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.applicationId;

    if (this.isEditMode && this.applicationId) {
      this.loadApplication(this.applicationId);
    }
  }

  loadApplication(id: string): void {
    this.isPageLoading = true;
    this.errorMessage = '';

    this.applicationService.getApplicationById(id).subscribe({
      next: (response) => {
        const application = response.application;

        this.company = application.company;
        this.position = application.position;
        this.location = application.location || '';
        this.workType = application.workType;
        this.status = application.status;
        this.salaryMin = application.salaryMin;
        this.salaryMax = application.salaryMax;
        this.jobUrl = application.jobUrl || '';
        this.appliedDate = this.formatDateForInput(application.appliedDate);
        this.source = application.source || '';
        this.notes = application.notes || '';

        this.isPageLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load application.';
        this.isPageLoading = false;
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.company || !this.position || !this.appliedDate) {
      this.errorMessage = 'Company, position, and applied date are required.';
      return;
    }

    this.isLoading = true;

    const applicationData: ApplicationData = {
      company: this.company,
      position: this.position,
      location: this.location,
      workType: this.workType,
      status: this.status,
      salaryMin: this.salaryMin,
      salaryMax: this.salaryMax,
      jobUrl: this.jobUrl,
      appliedDate: this.appliedDate,
      source: this.source,
      notes: this.notes
    };

    if (this.isEditMode && this.applicationId) {
      this.applicationService.updateApplication(this.applicationId, applicationData).subscribe({
        next: (response) => {
          this.successMessage = 'Application updated successfully.';
          this.isLoading = false;
          this.router.navigate(['/applications', response.application._id]);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to update application.';
          this.isLoading = false;
        }
      });

      return;
    }

    this.applicationService.createApplication(applicationData).subscribe({
      next: () => {
        this.successMessage = 'Application saved successfully.';
        this.isLoading = false;
        this.router.navigate(['/applications']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to save application.';
        this.isLoading = false;
      }
    });
  }

  formatDateForInput(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
  }
}