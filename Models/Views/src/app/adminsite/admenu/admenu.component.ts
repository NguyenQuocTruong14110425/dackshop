import { Component, Inject, OnInit, Output, Input, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditmenuComponent } from './editmenu/editmenu.component';
import { MenuService } from '../../webservice/menu.service';
import { BranchService } from '../../webservice/branch.service';
import { AlertService } from '../../webservice/alert.service';
import { Router } from '@angular/router';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-menu',
  templateUrl: './admenu.component.html',
  styleUrls: ['./admenu.component.css']
})
export class AdmenuComponent implements OnInit {
  formMenu: FormGroup
  menupost;
  branchpost;
  constructor(
    private FormBuilder: FormBuilder,
    private menuService: MenuService,
    private branchService: BranchService,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
    this.createForm();
  }
  openedit(menu, IsEdit) {
    const modalRef = this.modalService.open(EditmenuComponent);
    modalRef.componentInstance.menu = menu;
    modalRef.componentInstance.isEdit = IsEdit ? true : false;
    modalRef.componentInstance.emitService.subscribe((emmitedValue) => {
     this.GetListMenu();
  });
  }
  opencreate(createmenu) {
    const modalRefCreate = this.modalService.open(createmenu);
    modalRefCreate.result.then((data) => {
      this.onCreateMenuSubmit();
    }, (reason) => {
      this.GetListMenu();
    });
  }
createForm() {
  this.formMenu = this.FormBuilder.group({
    menuname: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ])]
  })
}
validateMenuname(controls) {
  const regExp =
    new RegExp(/^[a-zA-Z0-9\s]+$/);
  if (regExp.test(controls.value)) {
    return null;
  } else {
    return { 'validateMenuname': true }
  }
}
onCreateMenuSubmit() {
  const menu = {
    MenuName: this.formMenu.get('menuname').value,
  }
  this.menuService.createMenu(menu).subscribe(result => {
    if (!result.success) {
      this.alertService.error(result.message);
    } else {
      this.alertService.success(result.message)
      this.GetListMenu();
    }
  });
}
GetListbranch(idmenu)
{
  this.branchService.GetListBranch(idmenu).subscribe(result => {
    this.branchpost = result.data;
  });
}
GetListMenu() {
  this.menuService.GetListMenu().subscribe(result => {
    this.menupost = result.data;
  });
}
ngOnInit() {
  this.GetListMenu(); 
}
}
