import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../webservice/product.service';
import { AlertService } from '../../webservice/alert.service';
import { CatalogService } from '../../webservice/catalog.service';
import { TotalProductPipe } from '../../pipe/productpipe.pipe';
@Component({
  selector: 'app-adproduct',
  templateUrl: './adproduct.component.html',
  styleUrls: ['./adproduct.component.scss']
})
export class AdproductComponent implements OnInit {
  catalogposts: any;
  progress = false;
  productposts;
  newProduct = false;
  message;
  messageClass;
  processing = false;
  productMessage;
  lstColor: any;
  lstSize: any;
  form: FormGroup;
  paging = {
    step: 5,
    page: 1,
    size: 200,
    totalpage: []
  }
  constructor(
    private FormBuilder: FormBuilder,
    private productService: ProductService,
    private catalogService: CatalogService,
    private router: Router,
    private alertService: AlertService,
    private totalPipe: TotalProductPipe,
    private location: Location
  ) {
    this.productService.Listproduct;
  }
  onChangePage(page) {
    this.paging.page = page;
    this.productposts
  }
  getAllProducts() {
    this.progress = true;
    if (this.productService.CheckExitProduct() == 1) {
      this.productposts = this.productService.Listproduct;
      this.progress = false;
      this.paging.size = this.totalPipe.transform(this.productposts, false)
      this.paging.totalpage = this.productService.onGetMaxPage(this.paging.size, this.paging.step)
      this.progress = false;
    }
    else {
      this.productService.getAllProductTemp((err, result) => {
        if (err) {
          this.alertService.error(err);
        } else {
          this.productposts = result.data;
          this.progress = false;
          this.paging.size = this.totalPipe.transform(this.productposts, false)
          this.paging.totalpage = this.productService.onGetMaxPage(this.paging.size, this.paging.step)
        }
      })
    }
  }
  ngOnInit() {
    this.getAllProducts();
  }

}
