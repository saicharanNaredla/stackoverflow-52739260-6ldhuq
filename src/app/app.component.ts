import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  dataUrl = 'https://jsonplaceholder.typicode.com/users';
  data;
  data$ = new Subject<any>();
  search;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get(this.dataUrl)
      .subscribe(
        res => {
          this.data = res;
          this.data$.next(res);
        },
        err => {
          console.log('Error occured');
        }
      );

  }

  filter(search) {
    this.data$.next(this.data.filter(_ => _.name.includes(search)));
  }

}
