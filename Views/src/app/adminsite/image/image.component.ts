import { Component,ElementRef, Inject, OnInit, Output, Input, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageService } from '../../webservice/image.service';;
import { AlertService } from '../../webservice/alert.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  formFolder: FormGroup
  formImage: FormGroup
  Folderposts: any;
  DetailFolder: any;
  Imageposts: any;
  DetailImage: any;
  isDelete = false;
  isupload=false;
  progress = false;
  lstImage: any;
  constructor(
    private FormBuilder: FormBuilder,
    private FolderService: ImageService,
    private ImageService: ImageService,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService,
  ) {
    this.createFormFolder();
    this.createFormImage();
  }
  //open modal
  opencreate(createFolder) {
    const modalRefCreate = this.modalService.open(createFolder);
    modalRefCreate.result.then((data) => {
      this.onCreateFolderSubmit();
      this.isDelete = false;
      this.DetailFolder = null;
    }, (reason) => {
      this.GetListFolder();
    });
  }
  //open modal
  openedit(editFolder) {
    if (this.DetailFolder === undefined || this.DetailFolder == null) {
      this.alertService.error("Please select folder");
    }
    else {
      const modalRefCreate = this.modalService.open(editFolder);
      modalRefCreate.result.then((data) => {
        this.updateFolderSubmit();
      }, (reason) => {
        this.GetListFolder();
      });
    }
  }
  opencreateImage(createImage,idfolder) {
    const modalRefCreate = this.modalService.open(createImage);
    modalRefCreate.result.then((data) => {
      this.onCreateImageSubmit(idfolder);
      this.isupload = false;
    }, (reason) => {
      this.GetListImage();
    });
  }
  cancel()
  {
    this.isDelete=false;
    this.isupload=false;
    this.DetailFolder=null;
  }
  //Folder
  createFormFolder() {
    this.formFolder = this.FormBuilder.group({
      NameFolder: ''
    })
  }

  onCreateFolderSubmit() {
    var nameFolder = "";
    if (this.formFolder.get('NameFolder').value != "" || this.formFolder.get('NameFolder').value != " ") {
      nameFolder = this.formFolder.get('NameFolder').value;
    }
    else
    {
      nameFolder = "New Folder";
    }
    const Folder = {
      FolderName: nameFolder,
    }
    this.FolderService.createFolder(Folder).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.GetListFolder();
        this.createFormFolder();
        this.isDelete = false;
        this.DetailFolder = null;
      }
    });
  }
  updateFolderSubmit() {
    this.FolderService.editFolder(this.DetailFolder).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.detailFolder(result.data._id)
        this.GetListFolder();
        this.isDelete = false;
        this.DetailFolder = null;
      }
    });
  }
  DeleteFolder(id) {
    this.FolderService.deleteFolder(id).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.GetListFolder();
        this.isDelete = false;
        this.DetailFolder = null;
      }
    });
  }
  removeStatus() {
    this.isDelete = false;
  }
  detailFolder(id) {
    this.FolderService.GetOneFolder(id).subscribe(result => {
      this.DetailFolder = result.data;
      this.isDelete = true;
    });
  }
  getImageList(id) {
    this.FolderService.GetListImageByFolder(id).subscribe(result => {
      console.log(result)
      this.Imageposts = result.data;
      this.detailFolder(id);
    });
  }
  GetListFolder() {
    this.FolderService.GetListFolder().subscribe(result => {
      this.Folderposts = result.data;
      this.isDelete = false;
    });
  }
  //Image
  createFormImage() {
    this.formImage = this.FormBuilder.group({
      uploadPicture: '',
      ImageName: ''
    })
  }
  selectFile(e)
  {
    this.lstImage= Array.from(e.target.files);
    console.log(this.lstImage)
  }
  removeUploadImage(image)
  {
    console.log(image)
    this.lstImage = this.lstImage.filter(x => x !== image);
  }

  onCreateImageSubmit(idfolder) {

    const formData: any = new FormData();
    const files: Array<File> = this.lstImage;
    for(let index=0;index<files.length;index++)
    {
      formData.append("uploads[]", files[index], files[index]['name']);
    }
    this.progress=true;
    this.ImageService.uploadtest(idfolder,formData).subscribe(result => {
        if (!result.success) {
          this.alertService.error(result.message);
        } else {
          this.alertService.success(result.message)
          this.detailImage(idfolder)
          this.createFormImage();
          this.progress=false;
          this.isupload = false;
        }
      })
  }
  updateImageSubmit() {
    this.ImageService.editImage(this.DetailImage).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.detailImage(result.data._id)
        this.GetListImage();
      }
    });
  }
  DeleteImage(id) {
    this.ImageService.deleteImage(id).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.GetListImage();
      }
    });
  }
  GetListImage() {
    this.ImageService.GetListImage().subscribe(result => {
      this.Imageposts = result.data;
    });
  }
  detailImage(id) {
    this.ImageService.GetOneImage(id).subscribe(result => {
      this.DetailImage = result.data;
    });
  }
  ngOnInit() {
    this.GetListImage();
    this.GetListFolder();
  }

}
