import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, lastValueFrom, Observable} from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import {throwError} from "rxjs/internal/observable/throwError";
import {catchError} from "rxjs/internal/operators/catchError";
import {Router} from "@angular/router";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInStatus = false;
  private usersUrl = 'http://localhost:8080/api/user';
  private static _user = new BehaviorSubject<User | null>(null);
  user$ = UserService._user.asObservable();

  httpClient: HttpClient;
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {
    this.httpClient = http;
    // check if token exists in local storage and set login status accordingly
    this.loggedInStatus = !!localStorage.getItem('token');
  }

  // Method to set login status
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  // Method to check if the user is logged in
  isLoggedIn() {
    return this.loggedInStatus;
  }

  getUsers(): Observable<{ content: User[] }> {
    return this.http.get<{ content: User[] }>(this.usersUrl)
        .pipe(
            catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = this.httpClient.post<AuthResponse>(
      'http://localhost:8080/api/user/login',
      {
        email,
        password,
      },
      this.header
    );
    return lastValueFrom(res);
  }

  logout() {
    localStorage.removeItem('token'); // Clear token from local storage or any other stored user data
    localStorage.removeItem('email');
    this.setLoggedIn(false); // Update the loggedInStatus
    UserService._user.next(null); // Clear the user data BehaviorSubject or any user-related data

    // Redirect the user to the login page after logout
    this.router.navigate(['/login']); // Adjust '/login' to match your login page route
  }

  async getUserByUsername(username: string): Promise<User> {
    const result = this.httpClient.get<User>(
      `http://localhost:8080/api/user/${username}`,
      this.header
    );

    return lastValueFrom(result);
  }

  async getUserInformation() {
    this.httpClient
      .get<User>('http://localhost:8080/api/user/details', {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      })
      .subscribe((user) => {
        UserService._user.next(user);
      });
  }

  getUsernameByEmail(email: string): Promise<string> {
    const url = `${this.usersUrl}/username/${email}`;
    console.log(lastValueFrom(this.http.get(url, { headers: this.header.headers, responseType: 'text' })));
    return lastValueFrom(this.http.get(url, { headers: this.header.headers, responseType: 'text' }));
  }

}
