import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from "./post.model"
import { PostsService } from './posts-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(
    private postsService: PostsService) {}

  ngOnInit() {
    this.loadPosts()
  }

  loadPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.loadedPosts = posts
      this.isFetching = false;
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
    // Send Http request
  }

}
