import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(public http: HttpClient) { }

  public ping() {
    console.log('ping');
    const url = `${environment.apiUrl}/users/`;
    this.http.get(url)
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

}
