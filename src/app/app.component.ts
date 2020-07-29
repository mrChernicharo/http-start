import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from "./post.model"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http
      .get<{ [key: string]: Post }>('https://ng-course-backend-85a2d.firebaseio.com/posts.json')
      .pipe(map(response => {
        const postsArray: Post[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postsArray.push({...response[key], id: key})
          }
        }
        return postsArray;
      })
    )
    .subscribe(response => {
      console.log(response)
      // setTimeout(() => {

        this.loadedPosts = response
        this.isFetching = false;
      // }, 2000);
    })
  }

  onCreatePost(postData: Post) {
    console.log(postData)
    this.http
      .post<{ name: string }>(
      'https://ng-course-backend-85a2d.firebaseio.com/posts.json',
      postData)
      .subscribe(response => console.log(response))
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

}
