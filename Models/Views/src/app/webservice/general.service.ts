import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class GeneralService {

  domain = "http://localhost:8080";

  constructor(
    private http: Http


  ) { }
  //Color
  GetListColor() {
    return this.http.get(this.domain + '/color/all/').map(res => res.json());
  }
  GetOneColor(id) {
    return this.http.get(this.domain + '/Color/detail/'+id).map(res => res.json());
  }
  createColor(Color) {
    return this.http.post(this.domain + '/Color/add/', Color).map(res => res.json());
  }
  editColor(Color) {
    return this.http.put(this.domain + '/Color/update/', Color).map(res => res.json());
  }
  deleteColor(id) {
    console.log(id);
    return this.http.delete(this.domain + '/Color/delete/'+ id).map(res => res.json());
  }

   //size
   GetListSize() {
    return this.http.get(this.domain + '/size/all/').map(res => res.json());
  }
  GetOneSize(id) {
    return this.http.get(this.domain + '/size/detail/'+id).map(res => res.json());
  }
  createSize(size) {
    return this.http.post(this.domain + '/size/add/', size).map(res => res.json());
  }
  editSize(size) {
    return this.http.put(this.domain + '/size/update/', size).map(res => res.json());
  }
  deleteSize(id) {
    console.log(id);
    return this.http.delete(this.domain + '/size/delete/'+ id).map(res => res.json());
  }
}