import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {Post} from "../post.model";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  userService: UserService | undefined;

  constructor(private postService: PostService, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.posts = await this.postService.getPosts();
  }

  likePost(post: any) {
  }

  goToProtectedPage() {
    this.router.navigate(['/protected']); // Navigate to the protected page
  }
}
