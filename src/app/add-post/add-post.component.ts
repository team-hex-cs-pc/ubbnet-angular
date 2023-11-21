import { Component } from '@angular/core';
import { Post } from '../post.model';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  post: Post = {
    title: '',
    content: '',
    category: '',
    likes: 0,
    publicationDate: '',
    username: '',
  };

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  async onSubmit() {
    this.post.publicationDate = new Date().toISOString();

    try {
        this.post.username = this.userService.user!.username;
        const response = await this.postService.addPost(this.post);
        // Handle the success response here
        console.log('Post added successfully', response);

        // Redirect to the "All Posts" page
        await this.router.navigate(['/posts']);
    } catch (error) {
      // Handle other errors here
      console.error('Error while adding post', error);

      // Redirect to the "All Posts" page
      await this.router.navigate(['/posts']);
    }
  }

  async likePost(post: Post) {}

  goToProtectedPage() {
    this.router.navigate(['/protected']); // Navigate to the protected page
  }
}
