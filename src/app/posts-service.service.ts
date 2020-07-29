import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService{
  constructor(
    private http: HttpClient
  ) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    this.http
      .post<{ name: string }>(
      'https://ng-course-backend-85a2d.firebaseio.com/posts.json',
      postData)
      .subscribe(responseData => {
        console.log(responseData);
        this.fetchPosts();
      })
  }

  fetchPosts() {
    return this.http
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
  }

  deletePost() {
    return this.http
    .delete('https://ng-course-backend-85a2d.firebaseio.com/posts.json')
  }
}
