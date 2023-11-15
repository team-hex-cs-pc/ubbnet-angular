import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {Post} from "../post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
    private postsUrl = 'http://localhost:8080/api/post';
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

    async getPostsByUsername(username: string): Promise<Post[]> {
        const result = this.httpClient.get<Post[]>(
            `http://localhost:8080/api/user/posts/${username}`,
            this.header
        );

        return lastValueFrom(result);
    }
}
