import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class CatalogService {

  domain = "http://localhost:8080";

  constructor(
    private http: Http


  ) { }

    //catalog
    GetAllCatalog() {
        return this.http.get(this.domain + '/catalog/allcatalog/').map(res => res.json());
      }
      SearchCatalog(namecatalog) {
        return this.http.get(this.domain + '/catalog/searchcatalog/'+namecatalog).map(res => res.json());
      }
      GetListCatalog(idbranch) {
        return this.http.get(this.domain + '/catalog/all/'+idbranch).map(res => res.json());
      }
      createCatalog(idbranch,catalog) {
        return this.http.post(this.domain + '/catalog/add/' +idbranch, catalog).map(res => res.json());
      }
      deleteCatalog(id) {
        console.log(id);
        return this.http.delete(this.domain + '/catalog/delete/'+ id).map(res => res.json());
      }
      
    }