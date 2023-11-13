import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {lastValueFrom, Observable} from 'rxjs';
import {User} from "../user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getUsers(): Promise<any[]> {
    const url = `${this.usersUrl}/all`;
    return lastValueFrom(this.http.get<any[]>(url));
  }
}
