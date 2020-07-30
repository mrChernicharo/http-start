import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService{
  error = new Subject<HttpErrorResponse>();


  constructor(
    private http: HttpClient
  ) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    this.http
      .post<{ name: string }>(
        'https://ng-course-backend-85a2d.firebaseio.com/posts.json',
        postData
      ).subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error);
      })
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'true');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-course-backend-85a2d.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'custom-header': 'hello'}),
          // params: new HttpParams().set('print', 'pretty')
          // params: searchParams,
          // observe: "response", // body, response, events
          // responseType: "json",
        })
      .pipe(map(response => {
        const postsArray: Post[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postsArray.push({...response[key], id: key})
          }
        }
        return postsArray;
      }, catchError(error => {
        return throwError(error);
      }))
    )
  }

  deletePost() {
    return this.http
    .delete('https://ng-course-backend-85a2d.firebaseio.com/posts.json')
  }
}
