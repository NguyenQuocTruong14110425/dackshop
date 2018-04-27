import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Environment } from './environment';



@Injectable()
export class AuthService {

  domain = Environment.hostDomain

  constructor(
    private http: Http


  ) { }

  registerUser(user) {
    return this.http.post(this.domain + '/users/register', user).map(res => res.json());
  }

  loginUser(user) {
    return this.http.post(this.domain + '/users/login', user).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(this.domain + '/users/checkUsername/' + username).map(res => res.json());
  }
  checkEmail(email) {
    return this.http.get(this.domain + '/users/checkEmail/' + email).map(res => res.json());
  }
  profile() {
    return this.http.get(this.domain + '/users/profile/').map(res => res.json());
  }
  logout() {
    return this.http.get(this.domain + '/users/logout/').map(res => res.json());
  }



}
