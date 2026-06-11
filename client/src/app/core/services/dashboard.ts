import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

export interface DashboardStats {
  totalApplications: number;
  saved: number;
  applied: number;
  interviewing: number;
  offers: number;
  rejected: number;
  interviewRate: number;
  offerRate: number;
  rejectionRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private API_URL = 'http://localhost:5000/api/dashboard';

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

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.API_URL}/stats`, {
      headers: this.getAuthHeaders()
    });
  }
}