import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

export interface ApplicationData {
  company: string;
  position: string;
  location: string;
  workType: string;
  status: string;
  salaryMin: number | null;
  salaryMax: number | null;
  jobUrl: string;
  appliedDate: string;
  source: string;
  notes: string;
}

export interface JobApplication {
  _id: string;
  user: string;
  company: string;
  position: string;
  location: string;
  workType: string;
  status: string;
  salaryMin: number | null;
  salaryMax: number | null;
  jobUrl: string;
  appliedDate: string;
  source: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateApplicationResponse {
  message: string;
  application: JobApplication;
}

interface UpdateApplicationResponse {
  message: string;
  application: JobApplication;
}

interface DeleteApplicationResponse {
  message: string;
}

interface ApplicationsResponse {
  count: number;
  applications: JobApplication[];
}

interface ApplicationDetailResponse {
  application: JobApplication;
}

export interface CompanyHistoryResponse {
  company: string;
  totalApplications: number;
  lastAppliedDate: string | null;
  daysSinceLastApplied: number | null;
  recentApplication: JobApplication | null;
  applications: JobApplication[];
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private API_URL = 'https://jobtrackr-api-jju9.onrender.com/api/applications';
  private COMPANY_API_URL = 'https://jobtrackr-api-jju9.onrender.com/api/companies';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getApplications(company?: string, status?: string): Observable<ApplicationsResponse> {
    const params: string[] = [];

    if (company && company.trim()) {
      params.push(`company=${encodeURIComponent(company.trim())}`);
    }

    if (status && status !== 'All') {
      params.push(`status=${encodeURIComponent(status)}`);
    }

    const queryString = params.length > 0 ? `?${params.join('&')}` : '';

    return this.http.get<ApplicationsResponse>(`${this.API_URL}${queryString}`, {
      headers: this.getAuthHeaders()
    });
  }

  getApplicationById(id: string): Observable<ApplicationDetailResponse> {
    return this.http.get<ApplicationDetailResponse>(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createApplication(data: ApplicationData): Observable<CreateApplicationResponse> {
    return this.http.post<CreateApplicationResponse>(this.API_URL, data, {
      headers: this.getAuthHeaders()
    });
  }

  updateApplication(id: string, data: ApplicationData): Observable<UpdateApplicationResponse> {
    return this.http.put<UpdateApplicationResponse>(`${this.API_URL}/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  deleteApplication(id: string): Observable<DeleteApplicationResponse> {
    return this.http.delete<DeleteApplicationResponse>(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getCompanyHistory(companyName: string): Observable<CompanyHistoryResponse> {
    return this.http.get<CompanyHistoryResponse>(
      `${this.COMPANY_API_URL}/${encodeURIComponent(companyName)}/history`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }
}