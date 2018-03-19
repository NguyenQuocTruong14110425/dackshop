import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class MenuService {

  domain = "http://localhost:8080";

  constructor(
    private http: Http


  ) { }
  //menu
  GetListMenu() {
    return this.http.get(this.domain + '/menus/listmenu').map(res => res.json());
  }
  GetOneMenu(id) {
    return this.http.get(this.domain + '/menus/findmenu/'+id).map(res => res.json());
  }
  createMenu(menu) {
    return this.http.post(this.domain + '/menus/createmenu', menu).map(res => res.json());
  }
  deleteMenu(id) {
    console.log(id);
    return this.http.delete(this.domain + '/menus/deletemenu/'+ id).map(res => res.json());
  }
}