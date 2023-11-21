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
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class PostService extends CrudService<Post> {
  constructor(http: HttpClient) {
    super(http, '/post');
  }

  getPosts(): Promise<Post[]> {
    return lastValueFrom(this.http.get<Post[]>('/post'));
  }

  async addPost(post: Post): Promise<Post> {
    return await lastValueFrom(this.http.post<Post>('/post', post));
  }

  async getPostsByUsername(username: string): Promise<Post[]> {
    const result = this.http.get<Post[]>(`/user/posts/${username}`);
    return lastValueFrom(result);
  }
}
