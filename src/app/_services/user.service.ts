import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(public http: HttpClient) { }

  public ping() {
    this.http.get('https://example.com/api/things')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

}
