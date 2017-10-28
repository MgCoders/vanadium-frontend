import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(public http: HttpClient) { }

  public ping() {
    console.log('ping');
    this.http.get('http://localhost:8080/sulfur/api/users/')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

}
