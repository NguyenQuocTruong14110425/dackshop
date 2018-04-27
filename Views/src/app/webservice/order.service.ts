import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Environment } from './environment';



@Injectable()
export class OrderService {

  domain = Environment.hostDomain

  constructor(
    private http: Http


  ) { }

  
  //order
  Checkout(order) {
    return this.http.post(this.domain + '/carts/order/',order).map(res => res.json());
  }

  listorder() {
    return this.http.get(this.domain + '/carts/listorder/').map(res => res.json());
  }
  orderwithphone(phone) {
    return this.http.get(this.domain + '/carts/phoneforoder/'+phone).map(res => res.json());
  }
  getDetailOrder(id) {
    return this.http.get(this.domain + '/carts/detailorder/' + id).map(res => res.json());
  }
  updateorder(id,status) {
    return this.http.get(this.domain + '/carts/updateorder/'+id+'/'+status).map(res => res.json());
  }

}