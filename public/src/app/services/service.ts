import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class Service {
  options;

  domain = "";

  constructor(
    private http: Http


  ) { }

  newcustomer(customer) {
    return this.http.post('customers/newcustomer', customer).map(res => res.json());
  }
  getallcustomers() {
    return this.http.get('customers/getallcustomers' , this.options).map(res => res.json());
  }
  // getsinglecustomer(id) {
  //   return this.http.get(this.domain + '/customers/getsinglecustomer/' + id, this.options).map(res => res.json());
  // }
  // updatecustomer(customer) {
  //   return this.http.put(this.domain + '/customers/updatecustomer/', customer, this.options).map(res => res.json());
  // }

}
