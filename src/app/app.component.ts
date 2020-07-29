import { Component, OnInit } from '@angular/core';

import { Post } from "./post.model"
import { PostsService } from './posts-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  error: HttpErrorResponse = null;

  constructor(
    private postsService: PostsService) {}

  ngOnInit() {
    this.loadPosts()
  }

  loadPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      posts => {
      this.loadedPosts = posts
      this.isFetching = false;
    }, error => {
      console.log(error)
      this.error = error;
    })
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content)
    setTimeout(() => this.loadPosts(), 3000);
  }

  onFetchPosts() {
    this.loadPosts()
  }

  onClearPosts() {
    this.postsService.deletePost().subscribe(() => {
      this.loadedPosts = [];
    })
  }

}
