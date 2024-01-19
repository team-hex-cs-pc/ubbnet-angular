import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../post.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Reaction } from '../models/Reaction';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery: string = '';
  categoryQuery: string = '';

  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  async getPosts(): Promise<void> {
    try {
      const response: Post[] = await lastValueFrom(this.postService.getPosts());

      console.log(response);
      this.posts = response;
      this.filteredPosts = response; // Initialize filteredPosts with all posts
      console.log('Posts:', this.posts);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
    }
  }

  // Function to filter posts by search query
  searchPosts(): void {
    this.filteredPosts = this.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        post.category.toLowerCase().includes(this.categoryQuery.toLowerCase())
    );
  }

  async likePost(post: any) {
    try {
      const user = await this.userService.getUserName()!;
      const reaction: Reaction = {
        postReference: post.postReference,
        userName: user,
        type: 'LIKE'
      }

      const response = await this.postService.likePost1(reaction);
      this.getPosts();
    } catch (error: any) {
      console.error('Error fetching posts:', error);
    }
  }


  goToProtectedPage() {
    this.router.navigate(['/protected']);
  }

  // Function to handle filtering when the button is clicked
  filterPosts(): void {
    this.searchPosts();
  }

  // Function to clear filters and show all posts
  clearFilters(): void {
    this.searchQuery = '';
    this.categoryQuery = '';
    this.filterPosts(); // Trigger filtering to show all posts
  }
}
