import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../webservice/product.service';
import { MenuService } from '../../webservice/menu.service';
import { BranchService } from '../../webservice/branch.service';
import { CatalogService } from '../../webservice/catalog.service';
import { AlertService } from '../../webservice/alert.service';
import { AuthService } from '../../webservice/auth.service';
import { CartService } from '../../webservice/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  formsearch: FormGroup
  formlogin: FormGroup
  catalogpost;
  catalogposts;
  productpost;
  cartpost: object;
  total: object;
  profiles;
  searchmess;
  menupost;
  branchpost;
  productDetail;
  profileName;
  isLogin = false;
  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private menuService: MenuService,
    private branchService: BranchService,
    private catalogService: CatalogService,
    private AuthService: AuthService,
    private alertService: AlertService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.createForm();
    this.createFormFlogin();
    this.getProfile();
    this.cartService.storage;
    this.productService.Listproduct;
  }
  openCheckout(checkout) {
    const modalRefCreate = this.modalService.open(checkout);
    modalRefCreate.result.then((data) => {
    }, (reason) => {
      this.productDetail = null;
    });
    this.getCart();
  }
  openLogin(loginmodal) {
    const modalRefCreate = this.modalService.open(loginmodal);
    modalRefCreate.result.then((data) => {
      this.onLoginSubmit();
      this.createFormFlogin();
    }, (reason) => {
      this.productDetail = null;
    });
  }

  createFormFlogin() {
    this.formlogin = this.FormBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])]
    });
  }
  validateUsername(controls) {
    const regExp =
      new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername': true }
    }
  }

  validatePassword(controls) {
    const regExp =
      new RegExp(/^(?=.*?[a-z])(?=.*?[\d])(?=.*?[\w]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword': true }
    }
  }
  getProfile() {
    this.AuthService.profile().subscribe(result => {
      if (result.success) {
        this.profileName = result.data.FullName;
      }
    });
  }
  onLoginSubmit() {
    const user = {
      UserName: this.formlogin.get('username').value,
      Password: this.formlogin.get('password').value,
    }
    this.AuthService.loginUser(user).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.getProfile();
      }
    });
  };
  Logout() {
    this.AuthService.logout().subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.profileName = null
      }
    });
  };
  createForm() {
    this.formsearch = this.FormBuilder.group({
      searchproduct: ['', Validators.compose([
        Validators.maxLength(50)
      ])]
    });
  }

  //get list catalog
  GetAllCatalog() {
    this.catalogService.GetAllCatalog().subscribe(result => {
      this.catalogpost = result.data; // Assign array to use in HTML

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
  getDetailProduct(idproduct) {
    this.productService.getSingleProduct(idproduct).subscribe(result => {
      this.productDetail = result.data;
    });
  }
  getCart() {
    this.cartService.getCartDetail((err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        console.log(this.cartService.storage)
        if (this.cartService.storage != undefined || this.cartService.storage != null) {
          this.cartpost = this.cartService.storage.data;
          this.total = this.cartService.storage.TotalData;
        }
        else {
          this.cartpost = result.data;
          this.total = result.TotalData;
        }
      }
    })
  }
  removeAllCart() {
    this.cartService.getreRemoveAllCart((err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        this.alertService.success(result.message)
        if (this.cartService.storage != undefined || this.cartService.storage != null) {
          this.cartpost = this.cartService.storage.data;
          this.total = this.cartService.storage.TotalData;
        }
        else {
          this.cartpost = result.data;
          this.total = result.TotalData;
        }
        this.productDetail = null;
      }
    });
  }
  removeItemCart(idProduct) {
    this.cartService.getremoveItemCart(idProduct, (err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        this.alertService.success(result.message)
        if (this.cartService.storage != undefined || this.cartService.storage != null) {
          this.cartpost = this.cartService.storage.data;
          this.total = this.cartService.storage.TotalData;
        }
        else {
          this.cartpost = result.data;
          this.total = result.TotalData;
        }
        this.productDetail = null;
      }
    });
  }
  //
  reduceItemCart(idProduct) {
    this.cartService.getreduceItemCart(idProduct, (err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        this.alertService.success(result.message)
        if (this.cartService.storage != undefined || this.cartService.storage != null) {
          this.cartpost = this.cartService.storage.data;
          this.total = this.cartService.storage.TotalData;
        }
        else {
          this.cartpost = result.data;
          this.total = result.TotalData;
        }
        this.productDetail = null;
      }
    });
  }
  //
  increaseItemCart(idProduct) {
    this.cartService.getincreaseItemCart(idProduct, (err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        this.alertService.success(result.message)
        if (this.cartService.storage != undefined || this.cartService.storage != null) {
          this.cartpost = this.cartService.storage.data;
          this.total = this.cartService.storage.TotalData;
        }
        else {
          this.cartpost = result.data;
          this.total = result.TotalData;
        }
        this.productDetail = null;
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
  GetListBranch(idmenu: string) {

    this.branchService.GetListBranch(idmenu).subscribe(result => {
      this.branchpost = result.data; // Assign array to use in HTML

    });
  }
  //get list branch
  GetListCatalog(idbranch: string) {
    this.catalogService.GetListCatalog(idbranch).subscribe(result => {
      this.catalogposts = result.data; // Assign array to use in HTML
    });
  }
  logout() {
    this.authService.logout().subscribe(result => {
      if (!result.success) {
        this.searchmess = result.message;
      } else {
        this.searchmess = result.message;
        this.isLogin = false;
        window.location.reload();
      }
    });
  };
  ngOnInit() {
    this.getCart();
    this.GetAllCatalog();
    this.GetListMenu();
    this.getProfile();
  }

}
