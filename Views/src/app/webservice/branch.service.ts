import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class BranchService {

  domain = "http://localhost:8080";

  constructor(
    private http: Http


  ) { }
  
  //branch
  GetAllBranch() {
    return this.http.get(this.domain + '/branchs/allbranch').map(res => res.json());
  }
  SearchBranch(namebranch) {
    return this.http.get(this.domain + '/branchs/searchbranch/'+namebranch).map(res => res.json());
  }
  GetListBranch(idmenu) {
    return this.http.get(this.domain + '/branchs/listbranch/'+idmenu).map(res => res.json());
  }
  createBranch(idmenu,branch) {
    return this.http.post(this.domain + '/branchs/addbranch/' +idmenu, branch).map(res => res.json());
  }
  deleteBranch(id) {
    console.log(id);
    return this.http.delete(this.domain + '/branchs/deletebranch/'+ id).map(res => res.json());
  }
}