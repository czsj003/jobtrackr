import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface MeResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(data: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data);
  }

  getMe(): Observable<MeResponse> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<MeResponse>(`${this.API_URL}/me`, { headers });
  }

  saveAuthData(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  saveUser(user: { id: string; name: string; email: string }): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}