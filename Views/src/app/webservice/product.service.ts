import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';
import { WebsocketService } from '../socketcore/websocket.service';
import { Environment } from './environment';
import { Product } from '../model/product';
const SERVER_URL = 'ws://localhost:3000';
@Injectable()
export class ProductService {

  domain = Environment.hostDomain
  public Listproduct: Array<Product>
  public messages: Subject<any> = new Subject<any>();
  constructor(
    private http: Http,
    private websocket: WebsocketService
  ) {
    this.messages = <Subject<string>>this.websocket
    .connect(SERVER_URL)
    .map((response: MessageEvent): any => {
      let data = JSON.parse(response.data);
      console.log('message data' + data);
      return data;
    });
   }

  //product
  SearchProduct(nameproduct) {
    return this.http.get(this.domain + '/products/searchproduct/' + nameproduct).map(res => res.json());
  }
  addproduct(product) {
    return this.http.post(this.domain + '/product/add/', product).map(res => res.json());
  }
  getAllProducts() {
    return this.http.get(this.domain + '/product/all/').map(res => res.json());
  }
  getSingleProduct(id) {
    return this.http.get(this.domain + '/product/detail/' + id).map(res => res.json());
  }
  editProduct(product) {
    return this.http.put(this.domain + '/product/update/', product).map(res => res.json());
  }
  deleteProduct(id) {
    return this.http.delete(this.domain + '/product/delete/' + id).map(res => res.json());
  }
  getListProduct(idcatalog) {
    return this.http.get(this.domain + '/product/allforcatalog/' + idcatalog).map(res => res.json());
  }
  filterSize(size) {
    return this.http.get(this.domain + '/product/filtersize/' + size).map(res => res.json());
  }
  filterColor(color) {
    return this.http.get(this.domain + '/product/filtercolor/' + color).map(res => res.json());
  }
  coutbuyProduct(product, id) {
    return this.http.put(this.domain + '/product/countbuyproduct/' + id, product).map(res => res.json());
  }
  getCountProductInMonth() {
    return this.http.get(this.domain + '/product/countproduct/').map(res => res.json());
  }
  CheckExitProduct() {
    if (this.Listproduct != undefined || this.Listproduct != null)
      return 1
    return 0
  }
  getAllProductTemp(calback) {
    this.getAllProducts().subscribe(result => {
      if (!result.success) {
        return calback(result.mesage)
      } else {
        if (this.Listproduct == undefined && result.data) {
          this.Listproduct = result.data
          return calback(null, result)
        }
        else if (this.Listproduct) {
          return calback(null, this.Listproduct)
        }
      }
    });
  }
  onGetMaxPage(totalItem, step) {
    const maxPage = Math.floor(totalItem / step) + 1
    var newPage = [];
    for (let index = 1; index <= maxPage; index++) {
      newPage.push(index)
    }
    return newPage;
  }
  TranferArrayToArray(listParent, listChild) {
    if (listParent.length != 0 || listParent != undefined) {
      if (listChild.length == 0) {
        listChild = listParent.slice()
      }
      else {
        listParent.forEach(IdCatalog => {
          var index = listChild.indexOf(IdCatalog);
          if (index == -1) {
            listChild.push(IdCatalog)
          }
          else {
            listChild.splice(index, 1);
          }
        });
      }
    }
    return listChild;
  }

  TranferItemToArray(item,listChild) {
    if (item != null || item != undefined) {
      if (listChild.length == 0) {
        listChild.push(item)
      }
      else {
        var index = listChild.indexOf(item);
        if (index == -1) {
          listChild.push(item)
        }
        else {
          listChild.splice(index, 1);
        }
      }
    }
    return listChild;
  }

}