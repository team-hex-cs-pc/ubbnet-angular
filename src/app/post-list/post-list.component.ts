import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {Post} from "../post.model";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  postAuthors: Map<string, string> = new Map<string, string>(); // Map to hold post authors' usernames

  constructor(private postService: PostService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  async getPosts(): Promise<void> {
    try {
      const response: { content: any[] } = await lastValueFrom(this.postService.getPosts());
      if (response && response.content) {
        this.posts = response.content;
        console.log('Posts:', this.posts);
      }
    } catch (error: any) {
      console.error('Error fetching posts:', error);
    }
  }

  async populatePostAuthors() {
    try {
      for (const post of this.posts) {
        const authorEmail = post.username; // Assuming the post object has an 'author' property with the author's email
        if (authorEmail && !this.postAuthors.has(authorEmail)) {
          const authorUsername = await this.userService.getUsernameByEmail(authorEmail);
          this.postAuthors.set(authorEmail, authorUsername);
        }
      }
    } catch (error) {
      console.error('Error while fetching post authors:', error);
    }
  }

  likePost(post: any) {
  }

  goToProtectedPage() {
    this.router.navigate(['/protected']); // Navigate to the protected page
  }
}
