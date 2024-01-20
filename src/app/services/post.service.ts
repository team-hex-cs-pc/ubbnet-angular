import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Post } from '../post.model';
import { User } from '../models/User';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Reaction } from '../models/Reaction';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsUrl = 'http://localhost:8080/api/post';
  private reactionsUrl = 'http://localhost:8080/api/reaction';
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

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.postsUrl)
      .pipe(catchError(this.handleError));
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

  async addPost(post: Post): Promise<Post> {
    const url = `${this.postsUrl}`;
    try {
      return await lastValueFrom(this.http.post<Post>(url, post));
    } catch (error) {
      throw error;
    }
  }

  async getPostsByUsername(username: string): Promise<Post[]> {
    const result = this.httpClient.get<Post[]>(
      `http://localhost:8080/api/user/posts/${username}`,
      this.header
    );

    return lastValueFrom(result);
  }

  async likePost(postReference: string): Promise<Post> {
    const url = `${this.postsUrl}/like/${postReference}`;
    try {
      return await lastValueFrom(this.http.post<Post>(url, postReference));
    } catch (error) {
      throw error;
    }
  }

  async likePost1(reaction: Reaction): Promise<string> {
    const url = `${this.reactionsUrl}`;
    try {
      return await lastValueFrom(this.http.post(url, reaction, { responseType: 'text' }));
    } catch (error) {
      throw error;
    }
  }

}
