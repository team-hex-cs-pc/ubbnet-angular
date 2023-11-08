import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
    posts: any[] = [];

    constructor(private postService: PostService) {
    }

    ngOnInit(): void {
        this.postService.getPosts().subscribe((data: any) => {
            this.posts = data;
        });
    }

  formatPublicationDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const diffInMilliseconds = now.getTime() - date.getTime();
    const secondsAgo = Math.floor(diffInMilliseconds / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);

    if (secondsAgo < 60) {
      return secondsAgo + ' seconds ago';
    } else if (minutesAgo < 60) {
      return minutesAgo + ' minutes ago';
    } else if (hoursAgo < 24) {
      return hoursAgo + ' hours ago';
    } else {
      // You can further format the date if it's older than a day
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString();
    }
  }

  likePost(post: any) {
  }
}
