import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptions,
  Headers,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Colaborador } from '../_models/Colaborador';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {

  private jwt = new JwtHelper();

  constructor(private http: Http) {}

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  public isAuthenticated(): boolean {
    console.log('is auth?');
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    console.log((token != null) && !this.jwt.isTokenExpired(token));
    return (token != null) && !this.jwt.isTokenExpired(token);
  }

  login(email: string, password: string): Observable<boolean> {
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({headers});
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    const url = `${environment.apiUrl}/users/login`;
    this.http.post(url, body.toString(), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const colaborador: Colaborador = response.json();
        if (colaborador.token) {
          // set token property
          const role = this.jwt.decodeToken(colaborador.token).role;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          this.setToken(colaborador.token);
          localStorage.setItem('currentUser', JSON.stringify(colaborador));
          // return true to indicate successful login
          return true;
        } else {
          this.handleErrorObservable(response);
        }
      });
    return Observable.of(false);
  }

  private handleErrorObservable(error: Response | any) {
    return Observable.throw(error.message || error);
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem(TOKEN_NAME);
  }

}
