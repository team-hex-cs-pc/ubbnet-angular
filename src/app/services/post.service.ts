import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {Post} from "../post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = 'http://localhost:8080/post';

  constructor(private http: HttpClient) {
  }

  getPosts(): Promise<any[]> {
    const url = `${this.postsUrl}/all`;
    return lastValueFrom(this.http.get<any[]>(url));
  }

  async addPost(post: Post): Promise<Post> {
    const url = `${this.postsUrl}/add`;
    try {
      return await lastValueFrom(this.http.post<Post>(url, post));
    } catch (error) {
      throw error;
    }
  }
}
