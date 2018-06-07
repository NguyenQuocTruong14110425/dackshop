import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Environment } from './environment';



@Injectable()
export class OrderService {
  DataAnalyzeOfSale =
    {
      SaleOfYear: 0,
      SalesOfMonth: 0,
      SalesOfWeek: 0,
      SalesOfDay: 0
    }
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
  getOrderByCode(code) {
    return this.http.get(this.domain + '/order/trackingcode/' + code).map(res => res.json());
  }
  createOrder(order) {
    return this.http.post(this.domain + '/order/add/', order).map(res => res.json());
  }
  updateOrder(Order) {
    return this.http.put(this.domain + '/order/update/', Order).map(res => res.json());
  }
  deleteOrder(id) {
    return this.http.delete(this.domain + '/order/delete/' + id).map(res => res.json());
  }
  //analyze
  getAnalyzeSale() {
    return this.http.get(this.domain + '/order/analyzesale').map(res => res.json());
  }
  getDataOfSales(calback) {
    this.getAnalyzeSale().subscribe(result => {
      if (!result.success) {
        return calback(null, this.DataAnalyzeOfSale)
      } else {
        if (this.DataAnalyzeOfSale != undefined && result.data) {
          this.DataAnalyzeOfSale = result.data
        }
        return calback(null, result)
      }
    });

  }
}