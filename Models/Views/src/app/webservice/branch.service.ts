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
    return this.http.get(this.domain + '/branch/allbranch').map(res => res.json());
  }
  SearchBranch(namebranch) {
    return this.http.get(this.domain + '/branch/searchbranch/'+namebranch).map(res => res.json());
  }
  GetListBranch(idmenu) {
    return this.http.get(this.domain + '/branch/all/'+idmenu).map(res => res.json());
  }
  createBranch(branch) {
    return this.http.post(this.domain + '/branch/add/', branch).map(res => res.json());
  }
  editBranch(branch) {
    return this.http.put(this.domain + '/branch/update/', branch).map(res => res.json());
  }
  deleteBranch(id) {
    console.log(id);
    return this.http.delete(this.domain + '/branch/delete/'+ id).map(res => res.json());
  }
}