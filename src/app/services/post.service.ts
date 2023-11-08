import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from "../post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private postsUrl = 'http://localhost:8080/post';

    constructor(private http: HttpClient) {
    }

    getPosts(): Observable<any[]> {
        const url = `${this.postsUrl}/all`;
        return this.http.get<any[]>(url);
    }

    addPost(post: Post): Observable<Post> {
        const url = `${this.postsUrl}/add`;
        return this.http.post<Post>(url, post);
    }
}
