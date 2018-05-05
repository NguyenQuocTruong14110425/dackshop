import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Environment } from './environment';
import { Catalog } from '../model/catalog';


@Injectable()
export class CatalogService {

  domain = Environment.hostDomain
  public ListCatalog: Array<Catalog>

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
      createCatalog(catalog) {
        return this.http.post(this.domain + '/catalog/add/', catalog).map(res => res.json());
      }
      editCatalog(catalog) {
        return this.http.put(this.domain + '/catalog/update/', catalog).map(res => res.json());
      }
      deleteCatalog(id) {
        return this.http.delete(this.domain + '/catalog/delete/'+ id).map(res => res.json());
      }
      CheckExitCatalog() {
        if (this.ListCatalog != undefined || this.ListCatalog != null)
          return 1
        return 0
      }
      getAllCatalogTemp(calback) {
        this.GetAllCatalog().subscribe(result => {
          if (!result.success) {
            return calback(result.mesage)
          } else {
            if (this.ListCatalog == undefined && result.data) {
              this.ListCatalog = result.data
              return calback(null, result)
            }
            else if (this.ListCatalog) {
              return calback(null, this.ListCatalog)
            }
          }
        });
      }
      
    }