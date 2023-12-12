import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Post } from 'src/models/post.model';
import { PostService } from 'src/services/post.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  async getPosts(): Promise<void> {
    try {
      const response: Post[] = await this.postService.getPosts();

      console.log(response);
      this.posts = response;
      console.log('Posts:', this.posts);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
    }
  }

  likePost(post: any) {}

  goToProtectedPage() {
    this.router.navigate(['/protected']); // Navigate to the protected page
  }
}
