import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Environment } from './environment';
import { Branch } from '../model/branch';



@Injectable()
export class BranchService {

  domain = Environment.hostDomain
  public ListBranch: Array<Branch>

  constructor(
    private http: Http


  ) { }

  //branch
  GetAllBranch() {
    return this.http.get(this.domain + '/branch/allbranch').map(res => res.json());
  }
  SearchBranch(namebranch) {
    return this.http.get(this.domain + '/branch/searchbranch/' + namebranch).map(res => res.json());
  }
  GetListBranch(idmenu) {
    return this.http.get(this.domain + '/branch/all/' + idmenu).map(res => res.json());
  }
  createBranch(branch) {
    return this.http.post(this.domain + '/branch/add/', branch).map(res => res.json());
  }
  editBranch(branch) {
    return this.http.put(this.domain + '/branch/update/', branch).map(res => res.json());
  }
  deleteBranch(id) {
    return this.http.delete(this.domain + '/branch/delete/' + id).map(res => res.json());
  }
  CheckExitBranch() {
    if (this.ListBranch != undefined || this.ListBranch != null)
      return 1
    return 0
  }
  getAllBranchTemp(calback) {
    this.GetAllBranch().subscribe(result => {
      if (!result.success) {
        return calback(result.mesage)
      } else {
        if (this.ListBranch == undefined && result.data) {
          this.ListBranch = result.data
          return calback(null, result)
        }
        else if (this.ListBranch) {
          return calback(null, this.ListBranch)
        }
      }
    });
  }
}