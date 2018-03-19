import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../webservice/cart.service';
import { ProductService } from '../../webservice/product.service';
import { BranchService } from '../../webservice/branch.service';
import { CatalogService } from '../../webservice/catalog.service';
import { Router } from '@angular/router';
import {SidebarComponent} from '../../partials/sidebar/sidebar.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  formsearch: FormGroup
  value = '';
  searchmess;
  message;
  messageClass;
  cartpost;
  productpost
  catalogpost
  branchpost;
  Isbranch=false;
  Iscatalog=false;
  total;
  constructor(
    private FormBuilder: FormBuilder,
    private productService: ProductService,
    private cartService: CartService,
    private branchService: BranchService,
    private catalogService: CatalogService,
    private router: Router
  ) {
    this.createForm();
   }
  createForm() {
    this.formsearch = this.FormBuilder.group({
      searchname: ['', Validators.compose([
        Validators.maxLength(50)
      ])],
    });
  }
  goBack() {
    window.location.reload(); // Clear all variable states
  }
  SearchProduct() {
    this.productService.SearchProduct(this.formsearch.get('searchname').value).subscribe(data => {
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.productpost = data.products;
      }
    });
  }
  AddToCart(idproduct) {
    this.cartService.AddCart(idproduct).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        window.location.reload();
        this.getCart();
      }

    });
  }
  getCart() {
    this.cartService.shoppingcart().subscribe(data => {
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.cartpost = data.products;
        this.total=data.totalPrice;
      }
    });
  }
  onEnter(value: string) { 
    this.value = value; 
  }
  AllProduct() {
    this.productService.getAllProducts().subscribe(data => {
        this.productpost = data.product;
    });
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
          console.log(data.products);
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
    //filter with size
    FilterSize(size) {
      this.productService.filterSize(size).subscribe(data => {
        this.catalogpost = data.catalogs;
        this.branchpost = data.branches;
        this.productpost = data.products;
      });
    }
       //filter with size
       FilterColor(color) {
        this.productService.filterColor(color).subscribe(data => {
          this.catalogpost = data.catalogs;
          this.branchpost = data.branches;
          this.productpost = data.products;
        });
      }
  ngOnInit() {
    this.AllProduct();
    this.GetListBranch(); // Get all blogs on component load
    this.GetListCatalog();
  }


}
