import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../webservice/cart.service';
import { ProductService } from '../../webservice/product.service';
import { BranchService } from '../../webservice/branch.service';
import { AlertService } from '../../webservice/alert.service';
import { GeneralService } from '../../webservice/general.service';;
import { CatalogService } from '../../webservice/catalog.service';
import { Router } from '@angular/router';
import { TotalProductPipe } from '../../pipe/productpipe.pipe';
import { SidebarComponent } from '../../partials/sidebar/sidebar.component';
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
  colorposts: any;
  sizeposts: any;
  Isbranch = false;
  Iscatalog = false;
  progress = false;
  paging = {
    step: 5,
    page: 1,
    size: 200,
    totalpage: []
  }
  total;
  DataFilter = {
    Branch: [],
    Catalog: [],
    Size: [],
    Color: [],
    PriceMin: 0,
    PiceMax: 9999 * 9999
  }
  constructor(
    private FormBuilder: FormBuilder,
    private productService: ProductService,
    private cartService: CartService,
    private branchService: BranchService,
    private alertService: AlertService,
    private colorService: GeneralService,
    private sizeService: GeneralService,
    private totalPipe: TotalProductPipe,
    private catalogService: CatalogService,
    private router: Router
  ) {
    this.productService.Listproduct;
    this.branchService.ListBranch;
    this.catalogService.ListCatalog;
    this.createForm();
  }
  createForm() {
    this.formsearch = this.FormBuilder.group({
      searchname: ['', Validators.compose([
        Validators.maxLength(50)
      ])],
    });
  }
  GetListColor() {
    this.colorService.GetListColor().subscribe(result => {
      this.colorposts = result.data;
    });
  }
  GetListSize() {
    this.sizeService.GetListSize().subscribe(result => {
      this.sizeposts = result.data;
    });
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

  AllProduct() {
    this.progress = true;
    if (this.productService.CheckExitProduct() == 1) {
      this.productpost = this.productService.Listproduct;
      this.progress = false;
      this.paging.size = this.totalPipe.transform(this.productpost, false)
      this.paging.totalpage = this.productService.onGetMaxPage(this.paging.size, this.paging.step)
      this.progress = false;
    }
    else {
      this.productService.getAllProductTemp((err, result) => {
        if (err) {
          this.alertService.error(err);
        } else {
          this.productpost = result.data;
          this.progress = false;
          this.paging.size = this.totalPipe.transform(this.productpost, false)
          this.paging.totalpage = this.productService.onGetMaxPage(this.paging.size, this.paging.step)
        }
      })
    }
  }
  onChangePage(page) {
    this.paging.page = page;
    this.productpost
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
  ChooseBranch(CatalogChild) {
    this.DataFilter.Catalog = this.productService.TranferArrayToArray(CatalogChild, this.DataFilter.Catalog)
    this.GetListCatalog();
  }
  ChooseSize(IdSize) {
    this.DataFilter.Size = this.productService.TranferItemToArray(IdSize, this.DataFilter.Size)
    console.log(this.DataFilter)
  }
  ChooseColor(IdColor) {
    this.DataFilter.Color = this.productService.TranferItemToArray(IdColor, this.DataFilter.Color)
  }
  getCart() {
    this.cartService.shoppingcart().subscribe(data => {
      if (!data.success) {
        this.searchmess = data.message;
      } else {
        this.searchmess = data.message;
        this.cartpost = data.products;
        this.total = data.totalPrice;
      }
    });
  }
  onEnter(value: string) {
    this.value = value;
  }

  //get list branch
  GetListBranch() {
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
    //filter with branch
    // FilterCatalog(idbranch) {
    //   this.catalogService.GetListCatalog(idbranch).subscribe(result => {
    //     this.catalogpost = result.data;

    //   });
    // }
    // //filter with branch
    // FilterProduct(idcatalog) {
    //   this.productService.getListProduct(idcatalog).subscribe(data => {
    //     this.productpost = data.products;
    //   });
    // }
    //get list branch
    GetListCatalog() {
      if (this.catalogService.CheckExitCatalog() == 1) {
        this.catalogpost = this.catalogService.ListCatalog;
      }
      else {
        this.catalogService.getAllCatalogTemp((err, result) => {
          if (err) {
            this.alertService.error(err);
          } else {
            this.catalogpost = result.data;
          }
        })
      }
    }
    // //filter with size
    // FilterSize(size) {
    //   this.productService.filterSize(size).subscribe(data => {
    //     this.catalogpost = data.catalogs;
    //     this.branchpost = data.branches;
    //     this.productpost = data.products;
    //   });
    // }
    // //filter with size
    // FilterColor(color) {
    //   this.productService.filterColor(color).subscribe(data => {
    //     this.catalogpost = data.catalogs;
    //     this.branchpost = data.branches;
    //     this.productpost = data.products;
    //   });
    // }
    ngOnInit() {
      this.AllProduct();
      this.GetListBranch(); // Get all blogs on component load
      this.GetListCatalog();
      this.GetListSize();
      this.GetListColor();
    }


  }
