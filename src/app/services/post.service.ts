import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {Post} from "../post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'http://localhost:8080/api/post';

  constructor(private http: HttpClient) {
  }

  getPosts(): Promise<any[]> {
    const url = `${this.postsUrl}`;
    return lastValueFrom(this.http.get<Post[]>(url));
  }

  async addPost(post: Post): Promise<Post> {
    const url = `${this.postsUrl}`;
    try {
      return await lastValueFrom(this.http.post<Post>(url, post));
    } catch (error) {
      throw error;
    }
  }
}
