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
  getListOrder() {
    return this.http.get(this.domain + '/order/all/').map(res => res.json());
  }
  getDetailOrder(id) {
    return this.http.get(this.domain + '/order/detail/' + id).map(res => res.json());
  }
  createOrder(order) {
    return this.http.post(this.domain + '/order/add/',order).map(res => res.json());
  }
  updateOrder(Order) {
    return this.http.put(this.domain + '/order/update/',Order).map(res => res.json());
  }
  deleteOrder(id) {
    return this.http.delete(this.domain + '/order/delete/'+ id).map(res => res.json());
  }
}