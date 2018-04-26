import { Component, Inject, OnInit, Output, Input, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditcatalogComponent } from './editcatalog/editcatalog.component';
import { CatalogService } from '../../webservice/catalog.service';
import { BranchService } from '../../webservice/branch.service';
import { AlertService } from '../../webservice/alert.service';
import { Router } from '@angular/router';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-adcatalog',
  templateUrl: './adcatalog.component.html',
  styleUrls: ['./adcatalog.component.css']
})
export class AdcatalogComponent implements OnInit {
  formcatalog: FormGroup
  catalogpost;
  branchpost
  constructor(
    private FormBuilder: FormBuilder,
    private catalogService: CatalogService,
    private branchService: BranchService,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
    this.createForm();
  }
  openedit(catalog, IsEdit) {
    const modalRef = this.modalService.open(EditcatalogComponent);
    modalRef.componentInstance.catalog = catalog;
    modalRef.componentInstance.isEdit = IsEdit ? true : false;
    modalRef.componentInstance.emitService.subscribe((emmitedValue) => {
     this.GetListcatalog();
  });
  }
  opencreate(createcatalog) {
    const modalRefCreate = this.modalService.open(createcatalog);
    modalRefCreate.result.then((data) => {
      this.onCreatecatalogSubmit();
    }, (reason) => {
      this.GetListcatalog();
    });
  }
createForm() {
  this.formcatalog = this.FormBuilder.group({
    catalogname: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ])],
    description: ['', Validators.compose([
      Validators.minLength(3),
      Validators.maxLength(500),
    ])],
    idbranch:''
  })
}
onCreatecatalogSubmit() {
  const catalog = {
    CatalogName: this.formcatalog.get('catalogname').value,
    Description:this.formcatalog.get('description').value,
    idbranch:this.formcatalog.get('idbranch').value,
  }
  this.catalogService.createCatalog(catalog).subscribe(result => {
    if (!result.success) {
      this.alertService.error(result.message);
    } else {
      this.alertService.success(result.message)
      this.GetListcatalog();
    }
  });
}
GetListbranch() {
  this.branchService.GetAllBranch().subscribe(result => {
    this.branchpost = result.data;
  });
}
GetListcatalog() {
  this.catalogService.GetAllCatalog().subscribe(result => {
    this.catalogpost = result.data;
  });
}
ngOnInit() {
  this.GetListcatalog(); 
  this.GetListbranch();
}
}
