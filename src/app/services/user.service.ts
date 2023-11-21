import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  BehaviorSubject,
  delay,
  filter,
  iif,
  lastValueFrom,
  Observable,
  skip,
  tap,
} from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Post } from '../post.model';
import { FriendRequest } from '../models/FriendRequest';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudService<User> {
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();
  private _authToken = new BehaviorSubject<string | null>(
    localStorage.getItem('token')
  );
  authToken$ = this._authToken.asObservable();

  constructor(http: HttpClient, private router: Router) {
    super(http, '/user');
    this.authToken$
      .pipe(
        tap((token) =>
          token
            ? localStorage.setItem('token', token)
            : localStorage.removeItem('token')
        ),
        filter((token) => !!token),
        delay(10),
        tap(() => this.updateUserInformation())
      )
      .subscribe();
  }

  // Method to check if the user is logged in
  get isLoggedIn() {
    return this._authToken.getValue() !== null;
  }

  get user() {
    return this._user.getValue();
  }

  getUsers(): Promise<User[]> {
    return lastValueFrom(this.http.get<User[]>('/user'));
  }

  async login(email: string, password: string): Promise<void> {
    const res = await lastValueFrom(
      this.http.post<AuthResponse>('/user/login', { email, password })
    );
    // set auth token
    this._authToken.next(res.token);
  }

  logout() {
    this._user.next(null);
    this._authToken.next(null);

    // Redirect the user to the login page after logout
    this.router.navigate(['/login']); // Adjust '/login' to match your login page route
  }

  async getUserByUsername(username: string): Promise<User> {
    return lastValueFrom(this.http.get<User>(`/user/${username}`));
  }

  async updateUserInformation() {
    const user = await lastValueFrom(this.http.get<User>('/user/details'));
    this._user.next(user);
    return user;
  }

  getUsernameByEmail(email: string): Promise<string> {
    return lastValueFrom(this.http.get<string>(`/user/username/${email}`));
  }

  async registerUser(userData: User): Promise<User> {
    return lastValueFrom(this.http.post<User>('/user/register', userData));
  }

  async sendFriendRequest(email: string): Promise<void> {
    await lastValueFrom(this.http.post(`/user/add-friend/${email}`, {}));
  }

  async hasFriendRequest(username: string): Promise<FriendRequest> {
    return lastValueFrom(
      this.http.get<FriendRequest>(`/user/get-friend-request/${username}`)
    );
  }

  async isFriend(email: string): Promise<boolean> {
    return lastValueFrom(
      this.http.get<boolean>(`/user/is-friend/${email}`, {})
    );
  }

  async cancelFriendRequest(id: number): Promise<void> {
    await lastValueFrom(this.http.delete(`/user/decline-friend/${id}`));
  }

  async acceptFriendRequest(id: number): Promise<void> {
    await lastValueFrom(this.http.post(`/user/accept-friend/${id}`, {}));
  }
}
