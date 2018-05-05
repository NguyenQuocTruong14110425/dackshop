import { Component, Inject, OnInit, Output, Input, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditbranchComponent } from './editbranch/editbranch.component';
import { BranchService } from '../../webservice/branch.service';
import { CatalogService } from '../../webservice/catalog.service';
import { MenuService } from '../../webservice/menu.service';
import { AlertService } from '../../webservice/alert.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-adbranch',
  templateUrl: './adbranch.component.html',
  styleUrls: ['./adbranch.component.css']
})
export class AdbranchComponent implements OnInit {
  formbranch: FormGroup
  branchpost;
  catalogpost;
  menupost
  constructor(
    private FormBuilder: FormBuilder,
    private catalogService: CatalogService,
    private branchService: BranchService,
    private menuService: MenuService,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
    this.branchService.ListBranch;
    this.createForm();
  }
  openedit(branch, IsEdit) {
    const modalRef = this.modalService.open(EditbranchComponent);
    modalRef.componentInstance.branch = branch;
    modalRef.componentInstance.isEdit = IsEdit ? true : false;
    modalRef.componentInstance.emitService.subscribe((emmitedValue) => {
      this.GetListbranch();
    });
  }
  opencreate(createbranch) {
    const modalRefCreate = this.modalService.open(createbranch);
    modalRefCreate.result.then((data) => {
      this.onCreatebranchSubmit();
    }, (reason) => {
      this.GetListbranch();
    });
  }
  createForm() {
    this.formbranch = this.FormBuilder.group({
      branchname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      idmenu: '',
      description: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(500),
      ])]
    })
  }
  onCreatebranchSubmit() {
    const branch = {
      BranchName: this.formbranch.get('branchname').value,
      Description: this.formbranch.get('description').value,
      idmenu: this.formbranch.get('idmenu').value,
    }
    this.branchService.createBranch(branch).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.GetListbranch();
      }
    });
  }
  GetListcatalog(idbranch) {
    this.catalogService.GetListCatalog(idbranch).subscribe(result => {
      this.catalogpost = result.data;
    });
  }
  GetListbranch() {
    if (this.branchService.CheckExitBranch() == 1) {
      this.branchpost = this.branchService.ListBranch;
    }
    else {
      this.branchService.getAllBranchTemp((err, result) => {
        if (err) {
          this.alertService.error(err);
        } else {
          this.branchpost = result.data;
        }
      })
    }
  }
  GetListMenu() {
    this.menuService.GetListMenu().subscribe(result => {
      this.menupost = result.data;
    });
  }
  ngOnInit() {
    this.GetListbranch();
    this.GetListMenu();
  }
}
