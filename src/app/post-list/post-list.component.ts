import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {Post} from "../post.model";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
    posts: Post[] = [];

    constructor(private postService: PostService) {
    }

  async ngOnInit(): Promise<void> {
    this.posts = await this.postService.getPosts();
  }

  likePost(post: any) {
  }
}
