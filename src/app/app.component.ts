import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.http.get('https://ng-course-backend-85a2d.firebaseio.com/posts.json')
      .pipe(map(response => {
        const postsArray = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postsArray.push({...response[key], id: key})
          }
        }
        return postsArray;
      })
    )
    .subscribe(response => console.log(response))
  }

  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData)
    this.http.post(
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
