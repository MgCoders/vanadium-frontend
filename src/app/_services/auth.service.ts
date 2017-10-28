import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptions,
  Headers,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  public token: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  /*login(username: string, password: string): Observable<boolean> {
    return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }*/

  login(email: string, password: string): Observable<boolean> {
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({headers});
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    return this.http.post('http://localhost:8080/sulfur/api/users/login', body.toString(), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;
          const role = this.jwtHelper.decodeToken(token).role;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('token', token.split(' ')[1]);
          sessionStorage.setItem('currentUser', JSON.stringify({email, role, token}));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
