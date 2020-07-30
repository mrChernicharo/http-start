import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from "./post.model"
import { PostsService } from './posts-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error: HttpErrorResponse = null;
  private errorSub: Subscription;


  constructor(
    private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(error => {
      this.error = error;
    })
    this.loadPosts()
  }

  loadPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      posts => {
      this.loadedPosts = posts
      this.isFetching = false;
    }, error1 => {
      this.isFetching = false;
      console.log(error1)
      this.error = error1;
    })
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content)
    // setTimeout(() => this.loadPosts(), 3000);
  }

  onFetchPosts() {
    this.loadPosts()
  }

  onClearPosts() {
    this.postsService.deletePost().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
