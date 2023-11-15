import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  httpClient: HttpClient;
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {
    this.httpClient = http;
  }

  async getPostsByUsername(username: string): Promise<Post[]> {
    const result = this.httpClient.get<Post[]>(
      `http://localhost:8080/api/user/posts/${username}`,
      this.header
    );

    return lastValueFrom(result);
  }
}
