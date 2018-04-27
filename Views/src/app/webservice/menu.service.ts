import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Environment } from './environment';
@Injectable()
export class MenuService {
  
  domain = Environment.hostDomain

  constructor(
    private http: Http


  ) { }
  //menu
  GetListMenu() {
    return this.http.get(this.domain + '/menu/all/').map(res => res.json());
  }
  GetOneMenu(id) {
    return this.http.get(this.domain + '/menu/detail/'+id).map(res => res.json());
  }
  createMenu(menu) {
    return this.http.post(this.domain + '/menu/add/', menu).map(res => res.json());
  }
  editMenu(menu) {
    return this.http.put(this.domain + '/menu/update/', menu).map(res => res.json());
  }
  deleteMenu(id) {
    console.log(id);
    return this.http.delete(this.domain + '/menu/delete/'+ id).map(res => res.json());
  }
}