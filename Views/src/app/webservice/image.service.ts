import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class ImageService {

  domain = "http://localhost:8080";

  constructor(
    private http: Http


  ) { }
  //Folder
  GetListFolder() {
    return this.http.get(this.domain + '/folder/all/').map(res => res.json());
  }

  GetOneFolder(id) {
    return this.http.get(this.domain + '/folder/detail/' + id).map(res => res.json());
  }
  createFolder(Folder) {
    return this.http.post(this.domain + '/folder/add/', Folder).map(res => res.json());
  }
  editFolder(Folder) {
    return this.http.put(this.domain + '/folder/update/', Folder).map(res => res.json());
  }
  deleteFolder(id) {
    return this.http.delete(this.domain + '/folder/delete/' + id).map(res => res.json());
  }

  //Image
  GetListImageByFolder(id) {
    return this.http.get(this.domain + '/image/all/' + id).map(res => res.json());
  }
  GetListImage() {
    return this.http.get(this.domain + '/image/allimage/').map(res => res.json());
  }
  GetOneImage(id) {
    return this.http.get(this.domain + '/image/detail/' + id).map(res => res.json());
  }
  uploadtest(idfolder,Image) {
    return this.http.post(this.domain + '/image/uploadmutil/'+idfolder, Image).map(res => res.json());
  }
  uploadFile(Image) {
    return this.http.post(this.domain + '/image/uploadimage/', Image).map(res => res.json());
  }
  createImage(Image) {
    return this.http.post(this.domain + '/image/add/', Image).map(res => res.json());
  }
  editImage(Image) {
    return this.http.put(this.domain + '/image/update/', Image).map(res => res.json());
  }
  deleteImage(id) {
    console.log(id);
    return this.http.delete(this.domain + '/image/delete/' + id).map(res => res.json());
  }
}