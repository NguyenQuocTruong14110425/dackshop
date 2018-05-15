import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../webservice/cart.service';
import { ProductService } from '../../webservice/product.service';
import { BranchService } from '../../webservice/branch.service';
import { AlertService } from '../../webservice/alert.service';
import { GeneralService } from '../../webservice/general.service';;
import { CatalogService } from '../../webservice/catalog.service';
import { Router, NavigationExtras } from '@angular/router';
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
  listTempBranchForProduct;
  listTempCatalogForProduct;
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
    Size: '',
    Color: '',
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
    this.productpost;
  }
  FilterProduct(listProduct, listData) {
    var temp = [];
    this.productpost = listProduct;
    if (listData.length > 0) {
      this.productpost.filter((result) => {
        if (result.CatalogParent !== undefined) {
          for (let index = 0; index <= listData.length; index++) {
            if (result.CatalogParent._id == listData[index]) {
              temp.push(result)
            }
          }
        }
      })
      this.productpost = temp;
    }
    else {
      if (this.DataFilter.Branch.length == 0) {
        this.productpost = this.productService.Listproduct
      }
    }
    this.paging.size = this.totalPipe.transform(this.productpost, false)
    this.paging.totalpage = this.productService.onGetMaxPage(this.paging.size, this.paging.step)
  }
  FilterProductForSize(listProduct, item) {
    var temp = [];
    this.productpost = listProduct;
    if (item != null) {
      this.productpost.filter((result) => {
        if (result.Size !== undefined) {
          for (let index = 0; index <= result.Size.length; index++) {
            if (result.Size[index] != undefined && result.Size[index].IdSize != undefined && result.Size[index].IdSize._id == item) {
              temp.push(result)
            }
          }
        }
      })
      this.productpost = temp;
    }
    this.paging.size = this.totalPipe.transform(this.productpost, false)
    this.paging.totalpage = this.productService.onGetMaxPage(this.paging.size, this.paging.step)
  }
  FilterProductForColor(listProduct, item) {
    var temp = [];
    this.productpost = listProduct;
    if (item != null) {
      this.productpost.filter((result) => {
        if (result.Size !== undefined) {
          for (let index = 0; index <= result.Color.length; index++) {
            if (result.Color[index] != undefined && result.Color[index].IdColor != undefined && result.Color[index].IdColor._id == item) {
              temp.push(result)
            }
          }
        }
      })
      this.productpost = temp;
    }
    this.paging.size = this.totalPipe.transform(this.productpost, false)
    this.paging.totalpage = this.productService.onGetMaxPage(this.paging.size, this.paging.step)
  }
  ChooseBranch(CatalogChild) {
    this.DataFilter.Branch = this.productService.TranferArrayToArray(CatalogChild, this.DataFilter.Branch)
    this.GetListFilterCatalog()
    this.FilterProduct(this.productService.Listproduct, this.DataFilter.Branch);
    this.listTempBranchForProduct = this.productpost;
  }
  ChooseCatalog(LstCatalog) {
    this.DataFilter.Catalog = this.productService.TranferItemToArray(LstCatalog, this.DataFilter.Catalog)
    if (this.DataFilter.Branch.length == 0) {
      this.FilterProduct(this.productService.Listproduct, this.DataFilter.Catalog);
    }
    else {
      if (this.DataFilter.Catalog.length == 0) {
        this.FilterProduct(this.productService.Listproduct, this.DataFilter.Branch);
      }
      this.FilterProduct(this.listTempBranchForProduct, this.DataFilter.Catalog);
    }
    this.listTempCatalogForProduct = this.productpost;
  }
  ChooseSize(IdSize) {
    this.DataFilter.Size = IdSize;
    if (this.DataFilter.Branch.length == 0 && this.DataFilter.Catalog.length == 0) {
      this.FilterProductForSize(this.productService.Listproduct, this.DataFilter.Size);
    }
    else {
      if (this.DataFilter.Branch.length > 0 && this.DataFilter.Catalog.length == 0) {
        this.FilterProductForSize(this.listTempBranchForProduct, this.DataFilter.Size);
      }
      if (this.DataFilter.Branch.length > 0 && this.DataFilter.Catalog.length > 0) {
        this.FilterProductForSize(this.listTempCatalogForProduct, this.DataFilter.Size);
      }
      if (this.DataFilter.Branch.length == 0 && this.DataFilter.Catalog.length > 0) {
        this.FilterProductForSize(this.listTempCatalogForProduct, this.DataFilter.Size);
      }
    }
  }

  ChooseColor(IdColor) {
    this.DataFilter.Color = IdColor
    if (this.DataFilter.Branch.length == 0 && this.DataFilter.Catalog.length == 0) {
      this.FilterProductForColor(this.productService.Listproduct, this.DataFilter.Color);
    }
    else {
      if (this.DataFilter.Branch.length > 0 && this.DataFilter.Catalog.length == 0) {
        this.FilterProductForColor(this.listTempBranchForProduct, this.DataFilter.Color);
      }
      if (this.DataFilter.Branch.length > 0 && this.DataFilter.Catalog.length > 0) {
        this.FilterProductForColor(this.listTempCatalogForProduct, this.DataFilter.Color);
      }
      if (this.DataFilter.Branch.length == 0 && this.DataFilter.Catalog.length > 0) {
        this.FilterProductForColor(this.listTempCatalogForProduct, this.DataFilter.Color);
      }
    }
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

  GetListFilterCatalog() {
    this.catalogService.GetAllCatalog().subscribe(result => {
      this.catalogpost = result.data;
    })
  }
  GetListFilterProduct() {
    this.productService.getAllProducts().subscribe(result => {
      this.productpost = result.data;
    })
  }
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
  AddToCart(product) {
    var ItemProduct =
      {
        Product: {
          _id: product._id,
          ProductName: product.ProductName,
          Image: product.Image.LeftImage.IdUrl,
          ShortDescription: product.ShortDescription,
          Price: product.Price,
          Qty: 1,
          Size: '40',
          Color: 'red',
        },
        Promotion: {
          _id: product.Promotion ? product.Promotion[0]._id : '',
          PromotionName: product.Promotion ? product.Promotion[0].PromotionName : '',
          Value: product.Promotion ? product.Promotion[0].Value : 0,
          SaleEndDate: product.Promotion ? product.Promotion[0].SaleEndDate : null,
          TypePromotion: product.Promotion ? product.Promotion[0].TypePromotion : '',
        }
      }
    this.cartService.AddCart(ItemProduct).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.cartService.storage =
          {
            data: result.data,
            TotalData: {
              totalOrder: result.TotalData.totalOrder,
              totalQtyOrder: result.TotalData.totalQtyOrder,
            }
          }
        this.alertService.success(result.message)
      }
    });
  }
  onDetail(idparam) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "Idproduct": idparam
      }
    };
    this.router.navigate(["detailproduct"], navigationExtras);
  }
  ngOnInit() {
    this.AllProduct();
    this.GetListBranch(); // Get all blogs on component load
    this.GetListCatalog();
    this.GetListSize();
    this.GetListColor();
  }


}
