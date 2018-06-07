import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Environment } from './environment';



@Injectable()
export class PaymentService {
  domain = Environment.hostDomain

  constructor(
    private http: Http
  ) { }


  //order
  PaymentCheckout(orderInfo) {
    return this.http.post(this.domain + '/payment/checkout',orderInfo).map(res => res.json());
  }
  getDetailOrder(gateway) {
    return this.http.get(this.domain + '/payment/'+ gateway +'/callback').map(res => res.json());
  }
}