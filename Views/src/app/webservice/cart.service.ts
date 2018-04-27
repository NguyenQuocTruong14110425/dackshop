import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Environment } from './environment';



@Injectable()
export class CartService {

  domain = Environment.hostDomain

  constructor(
    private http: Http


  ) { }

    //cart
    AddCart(idproduct) {
        return this.http.get(this.domain + '/carts/addcart/'+idproduct).map(res => res.json());
      }
      shoppingcart() {
        return this.http.get(this.domain + '/carts/shoppingcart').map(res => res.json());
      }
    
      RemoveAllCart() {
        return this.http.get(this.domain + '/carts/removecart').map(res => res.json());
      }
      removeItemCart(idproduct) {
        return this.http.get(this.domain + '/carts/removeitem/'+idproduct).map(res => res.json());
      }
      reduceItemCart(idproduct) {
        return this.http.get(this.domain + '/carts/reduceitem/'+idproduct).map(res => res.json());
      }
      increaseItemCart(idproduct) {
        return this.http.get(this.domain + '/carts/increaseitem/'+idproduct).map(res => res.json());
      }

    }