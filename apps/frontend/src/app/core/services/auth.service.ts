import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = '/api/auth';
  private tokenKey = 'access_token';

  isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());

  login(credentials: any) {
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((res) => {
          localStorage.setItem(this.tokenKey, res.access_token);
          this.isAuthenticated.next(true);
          this.router.navigate(['/dashboard']);
        }),
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
