import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Environment } from './environment';



@Injectable()
export class PromotionService {

  domain = Environment.hostDomain

  constructor(
    private http: Http


  ) { }
  //Promotion
  GetListPromotion() {
    return this.http.get(this.domain + '/promotion/all/').map(res => res.json());
  }
  GetOnePromotion(id) {
    return this.http.get(this.domain + '/promotion/detail/'+id).map(res => res.json());
  }
  createPromotion(promption) {
    return this.http.post(this.domain + '/promotion/add/', promption).map(res => res.json());
  }
  editPromotion(promption) {
    return this.http.put(this.domain + '/promotion/update/', promption).map(res => res.json());
  }
  deletePromotion(id) {
    return this.http.delete(this.domain + '/promotion/delete/'+ id).map(res => res.json());
  }
  GenerateCoupon(coupon) {
    return this.http.post(this.domain + '/generate/code/',coupon).map(res => res.json());
  }
  CheckCoupon(coupon) {
    return this.http.post(this.domain + '/check/code/',coupon).map(res => res.json());
  }
}