import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../../webservice/menu.service';
import { BranchService } from '../../webservice/branch.service';
import { CatalogService } from '../../webservice/catalog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './admenu.component.html',
  styleUrls: ['./admenu.component.css']
})
export class AdmenuComponent  implements OnInit{
  form: FormGroup
  messageClass;
  message;
  loadingMenus = false;
  meupost;
  branchpost;
  catalogpost;
  Isbranch=false;
  Iscatalog=false;
  constructor(
    private FormBuilder: FormBuilder,
    private menuService: MenuService,
    private branchService: BranchService,
    private catalogService: CatalogService,
    private router: Router
  ) {
    this.createForm();
  }
  createForm() {
    this.form = this.FormBuilder.group({
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
      menuname: this.form.get('menuname').value,
    }
    this.menuService.createMenu(menu).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.GetListMenu();
      }
    });
  }
  onDeleteCatalogsubmit(id:string) {
    console.log(id);
    this.catalogService.deleteCatalog(id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.GetListMenu();
      }
    });
  }
  onDeleteBranchsubmit(id:string) {
    console.log(id);
    this.branchService.deleteBranch(id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.GetListMenu();
      }
    });
  }
  onDeleteMenuSubmit(id:string) {
    console.log(id);
    this.menuService.deleteMenu(id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.GetListMenu();
      }
    });
  }
  goBack() {
    window.location.reload(); // Clear all variable states
  }
  // Reload blogs on current page
  reloadMenus() {
    this.loadingMenus = true; // Used to lock button
    this.GetListMenu(); // Add any new blogs to the page
    setTimeout(() => {
      this.loadingMenus = false; // Release button lock after four seconds
    }, 4000);
  }
   // Function to get all blogs from the database
   GetListMenu() {
    // Function to GET all blogs from database
    this.menuService.GetListMenu().subscribe(data => {
      this.meupost = data.menus; // Assign array to use in HTML
    });
  }
  //get list branch
  GetListBranch(idmenu:string) {
    // Function to GET all blogs from database
    console.log(idmenu)
    this.Isbranch =true;
    this.Iscatalog =false;
    this.branchService.GetListBranch(idmenu).subscribe(data => {
      this.branchpost = data.branches; // Assign array to use in HTML

    });
  }
   //get list branch
   GetListCatalog(idbranch:string) {
    // Function to GET all blogs from database
    console.log(idbranch)
    this.Iscatalog =true;
    this.catalogService.GetListCatalog(idbranch).subscribe(data => {
      this.catalogpost = data.catalogs; // Assign array to use in HTML

    });
  }
  ngOnInit() {
   this.GetListMenu(); // Get all blogs on component load
  }
}



