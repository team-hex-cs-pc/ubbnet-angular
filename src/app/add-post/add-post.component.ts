import {Component} from '@angular/core';
import {Post} from "../post.model";
import {Router} from "@angular/router";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  post: Post = {title: "", content: "", category: "", likes: 0, publicationDate: ""}

  constructor(private postService: PostService, private router: Router) {
  }

  async onSubmit() {
    this.post.publicationDate = new Date().toISOString();

    try {
      const response = await this.postService.addPost(this.post);
      // Handle the success response here
      console.log('Post added successfully', response);

      // Redirect to the "All Posts" page
      this.router.navigate(['/posts']);
    } catch (error) {
      // Handle the error here
      console.error('Error while adding post', error);

      // Redirect to the "All Posts" page
      this.router.navigate(['/posts']);
    }
  }


  async likePost(post: Post) {

  }
}
