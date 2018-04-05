import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../webservice/auth.service';
import { ProductService } from '../../webservice/product.service';
import { MenuService } from '../../webservice/menu.service';
import { BranchService } from '../../webservice/branch.service';
import { CatalogService } from '../../webservice/catalog.service';
import { CartService } from '../../webservice/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  formsearch: FormGroup
  catalogpost;
  catalogposts;
  productpost;
  cartpost;
  total;
  profiles;
  searchmess;
  menupost;
  branchpost;
  isLogin=false;
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private menuService: MenuService,
    private branchService: BranchService,
    private catalogService: CatalogService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    this.createForm();
    this.getCart();
   }

   createForm() {
    this.formsearch = this.FormBuilder.group({
      searchproduct: ['', Validators.compose([
        Validators.maxLength(50)
      ])]
    });
  }
  goBack() {
    window.location.reload(); // Clear all variable states
  }
  // Reload blogs on current page
  reloadSearchs() {
    this.GetAllCatalog(); // Add any new blogs to the page
    this.getCart();
  }
  //get list catalog
  GetAllCatalog() {
    this.catalogService.GetAllCatalog().subscribe(result => {
      this.catalogpost = result.data; // Assign array to use in HTML

    });
  }
  AllProduct() {
    this.productService.getAllProducts().subscribe(result => {
        this.productpost = result.data;
    });
  }
  SearchProduct() {
    this.productService.SearchProduct(this.formsearch.get('searchname').value).subscribe(result => {
      if (!result.success) {
        this.searchmess = result.message;
      } else {
        this.searchmess = result.message;
        this.productpost = result.data;
      }
    });
  }
  SearchCatalog() {
    this.catalogService.SearchCatalog(this.formsearch.get('searchname').value).subscribe(result => {
      if (!result.success) {
        this.searchmess = result.message;
      } else {
        this.searchmess = result.message;
        this.catalogpost = result.data;
      }
    });
  }
  getCart() {
    this.cartService.shoppingcart().subscribe(result => {
      if (result.success==false) {
        this.searchmess = result.message;
      } else {
        this.searchmess = result.message;
        this.cartpost = result.products;
        this.total=result.totalPrice;
      }
    });
  }
  removeAllCart() {
    this.cartService.RemoveAllCart().subscribe(result => {
      if (result.success==false) {
        this.searchmess = result.message;
      } else {
        this.searchmess = result.message;
        this.getCart();
      }
    });
  }
  removeItemCart(idProduct){
    this.cartService.removeItemCart(idProduct).subscribe(result => {
      if (result.success==false) {
        this.searchmess = result.message;

      } else {
        this.searchmess = result.message;
        this.getCart();
      }
    });
  }
  //
  reduceItemCart(idProduct){
    this.cartService.reduceItemCart(idProduct).subscribe(result => {
      if (result.success==false) {
        this.searchmess = result.message;

      } else {
        this.searchmess = result.message;
        this.getCart();
      }
    });
  }
    //
    increaseItemCart(idProduct){
      this.cartService.increaseItemCart(idProduct).subscribe(result => {
        if (result.success==false) {
          this.searchmess = result.message;
        } else {
          this.searchmess = result.message;
          this.getCart();
        }
      });
    }
  // Function to get all blogs from the resultbase
  GetListMenu() {
    // Function to GET all blogs from resultbase
    this.menuService.GetListMenu().subscribe(result => {
      this.menupost = result.data; // Assign array to use in HTML

    });
  }
  //get list branch
  GetListBranch(idmenu:string) {

    this.branchService.GetListBranch(idmenu).subscribe(result => {
      this.branchpost = result.data; // Assign array to use in HTML

    });
  }
   //get list branch
   GetListCatalog(idbranch:string) {
    this.catalogService.GetListCatalog(idbranch).subscribe(result => {
      this.catalogposts = result.data; // Assign array to use in HTML
    });
  }
  getprofile(){
    this.authService.profile().subscribe(result => {
      if (!result.success) {
        this.searchmess = result.message;
      } else {
        this.searchmess = result.message;
        this.profiles=result.users;
        this.isLogin=true;
      }
    });
    console.log(this.profiles);
  };
  logout()
  {
    this.authService.logout().subscribe(result => {
      if (!result.success) {
        this.searchmess = result.message;
      } else {
        this.searchmess = result.message;
        this.isLogin=false;
        window.location.reload();
      }
    });
  };
  ngOnInit() {
    this.AllProduct();
    this.GetAllCatalog();
    this.GetListMenu();
    this.getprofile();
  }

}
