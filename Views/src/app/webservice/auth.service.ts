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
    return this.http.post(this.domain + '/user/register/', user).map(res => res.json());
  }

  updateUser(user) {
    return this.http.put(this.domain + '/user/update/', user).map(res => res.json());
  }
  deleteUser(idparam) {
    return this.http.delete(this.domain + '/user/delete/' + idparam).map(res => res.json());
  }
  detailUser(idparam) {
    return this.http.get(this.domain + '/user/detail/'+idparam).map(res => res.json());
  }
  GetAllUser() {
    return this.http.get(this.domain + '/user/all/').map(res => res.json());
  }
  loginUser(user) {
    return this.http.post(this.domain + '/user/login/', user).map(res => res.json());
  }
  checkUsername(username) {
    return this.http.get(this.domain + '/user/checkUsername/' + username).map(res => res.json());
  }
  checkEmail(email) {
    return this.http.get(this.domain + '/user/checkEmail/' + email).map(res => res.json());
  }
  profile() {
    return this.http.get(this.domain + '/user/profile/').map(res => res.json());
  }

  logout() {
    return this.http.get(this.domain + '/user/logout/').map(res => res.json());
  }
  //
  loginGoogle() {
    return this.domain + '/auth/google'
  }
  googlecallback()
  {
    return this.http.get(this.domain + '/auth/google/callback').map(res => res.json());
  }
  loginFacebook() {
    return this.domain + '/auth/facebook'
  }
  facebookcallback()
  {
    return this.http.get(this.domain + '/auth/facebook/callback').map(res => res.json());
  }
}
