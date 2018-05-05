import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Environment } from './environment';



@Injectable()
export class CartService {

  domain = Environment.hostDomain
  public storage: {
    data: {},
    TotalData: {
      totalOrder: 0,
      totalQtyOrder: 0
    }
  };
  constructor(
    private http: Http
  ) { }

  //cart
  AddCart(product) {
    return this.http.post(this.domain + '/cart/addcart/', product).map(res => res.json());
  }
  shoppingcart() {
    return this.http.get(this.domain + '/cart/shoppingcart').map(res => res.json());
  }
  RemoveAllCart() {
    return this.http.get(this.domain + '/cart/removecart').map(res => res.json());
  }
  removeItemCart(idproduct) {
    return this.http.get(this.domain + '/cart/removeitem/' + idproduct).map(res => res.json());
  }
  reduceItemCart(idproduct) {
    return this.http.get(this.domain + '/cart/reduceitem/' + idproduct).map(res => res.json());
  }
  increaseItemCart(idproduct) {
    return this.http.get(this.domain + '/cart/increaseitem/' + idproduct).map(res => res.json());
  }
  getCartDetail(calback) {
    this.shoppingcart().subscribe(result => {
      if (!result.success) {
        if (result.data == undefined && this.storage) {
          return calback(null, this.storage)
        }
      } else {
        if (this.storage != undefined && result.data) {
          this.storage.data = result.data
          this.storage.TotalData = result.TotalData
        }
        return calback(null, result)
      }
    });

  }
  getincreaseItemCart(idproduct, calback) {
    this.increaseItemCart(idproduct).subscribe(result => {
      if (!result.success) {
        return calback(result.mesage)
      } else {
        if (this.storage != undefined && result.data) {
          this.storage.data = result.data
          this.storage.TotalData = result.TotalData
        }
        return calback(null, result)
      }
    });
  }
  getreduceItemCart(idproduct, calback) {
    this.reduceItemCart(idproduct).subscribe(result => {
      if (!result.success) {
        return calback(result.mesage)
      } else {
        if (this.storage != undefined && result.data) {
          this.storage.data = result.data
          this.storage.TotalData = result.TotalData
        }
        return calback(null, result)
      }
    });
  }
  getremoveItemCart(idproduct, calback) {
    this.removeItemCart(idproduct).subscribe(result => {
      if (!result.success) {
        return calback(result.mesage)
      } else {
        if (this.storage != undefined && result.data) {
          this.storage.data = result.data
          this.storage.TotalData = result.TotalData
        }
        return calback(null, result)
      }
    });
  }
  getreRemoveAllCart(calback) {
    this.RemoveAllCart().subscribe(result => {
      if (!result.success) {
        return calback(result.mesage)
      } else {
        if (this.storage != undefined && result.data) {
          this.storage.data = result.data
          this.storage.TotalData = result.TotalData
        }
        return calback(null, result)
      }
    });
  }


}