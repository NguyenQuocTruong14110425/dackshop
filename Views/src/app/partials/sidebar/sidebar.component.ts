import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../webservice/product.service';
import { CatalogService } from '../../webservice/catalog.service';
import { BranchService } from '../../webservice/branch.service';
import { Router } from '@angular/router';
import {SearchComponent} from '../../clientsite/search/search.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  loadingMenus = false;
  meupost;
  branchpost;
  catalogpost;
  productpost;
  Isbranch=false;
  Iscatalog=false;
  constructor(
    private FormBuilder: FormBuilder,
    private productService: ProductService,
    private catalogService: CatalogService,
    private branchService: BranchService,
    private router: Router
  ) { }
  goBack() {
    window.location.reload(); // Clear all variable states
  }
  // Reload blogs on current page
  reloadSearchs() {
    this.loadingMenus = true; // Used to lock button
    this.GetListBranch();
    this.GetListCatalog(); // Add any new blogs to the page
    setTimeout(() => {
      this.loadingMenus = false; // Release button lock after four seconds
    }, 4000);
  }
  //get list branch
  GetListBranch() {

    this.Isbranch =true;
    this.Iscatalog =false;
    this.branchService.GetAllBranch().subscribe(data => {
      this.branchpost = data.branches; // Assign array to use in HTML

    });
  }
  //filter with branch
  FilterCatalog(idbranch) {
    this.catalogService.GetListCatalog(idbranch).subscribe(data => {
      this.catalogpost = data.catalogs;
    });
  }
   //filter with branch
   FilterProduct(idcatalog) {
    this.productService.getListProduct(idcatalog).subscribe(data => {
      this.productpost = data.products;
    });
  }
   //get list branch
   GetListCatalog() {
    this.Iscatalog =true;
    this.catalogService.GetAllCatalog().subscribe(data => {
      this.catalogpost = data.catalogs; // Assign array to use in HTML

    });
  }
  ngOnInit() {
   this.GetListBranch(); // Get all blogs on component load
   this.GetListCatalog();
  }

}
