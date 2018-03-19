import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class ProductService {

  domain = "http://localhost:8080";

  constructor(
    private http: Http


  ) { }

  //product
  SearchProduct(nameproduct) {
    return this.http.get(this.domain + '/products/searchproduct/'+nameproduct).map(res => res.json());
  }
  addproduct(product) {
    return this.http.post(this.domain + '/products/createproduct/' , product).map(res => res.json());
  }
  getAllProducts() {
    return this.http.get(this.domain + '/products/getallproducts').map(res => res.json());
  }
  getSingleProduct(id) {
    return this.http.get(this.domain + '/products/singleProduct/' + id).map(res => res.json());
  }
  editProduct(product) {
    return this.http.put(this.domain + '/products/updateProduct/', product).map(res => res.json());
  }
  deleteProduct(id) {
    return this.http.delete(this.domain + '/products/deleteproduct/'+ id).map(res => res.json());
  }
  getListProduct(idcatalog) {
    return this.http.get(this.domain + '/products/listproduct/'+idcatalog).map(res => res.json());
  }
  filterSize(size) {
    return this.http.get(this.domain + '/products/filtersize/'+size).map(res => res.json());
  }
  filterColor(color) {
    return this.http.get(this.domain + '/products/filtercolor/'+color).map(res => res.json());
  }
  coutbuyProduct(product,id) {
    return this.http.put(this.domain + '/products/countbuyproduct/'+ id, product).map(res => res.json());
  }

}