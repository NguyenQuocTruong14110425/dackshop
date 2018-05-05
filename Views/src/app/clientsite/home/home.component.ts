import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../webservice/cart.service';
import { ProductService } from '../../webservice/product.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertService } from '../../webservice/alert.service';
import { TotalProductPipe } from '../../pipe/productpipe.pipe';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productpost
  progress = false;
  paging = {
    step: 5,
    page: 1,
    size: 200,
    totalpage: []
  }
  constructor(
    private FormBuilder: FormBuilder,
    private cartService: CartService,
    private alertService: AlertService,
    private productService: ProductService,
    private router: Router,
    private totalPipe: TotalProductPipe,
  ) { 
    this.productService.Listproduct;
  }
  AllProduct() {
    this.progress=true;
    if(this.productService.CheckExitProduct()==1)
    {
      this.productpost = this.productService.Listproduct;
      this.paging.size = this.totalPipe.transform(this.productpost, false)
      this.paging.totalpage = this.productService.onGetMaxPage(this.paging.size, this.paging.step)
      this.progress=false;
    }
    else
    {
      this.productService.getAllProductTemp((err, result) => {
        if (err) {
          this.alertService.error(err);
        } else {
          console.log("first load page home")
            this.productpost = result.data;
            this.progress=false;
            this.paging.size = this.totalPipe.transform(this.productpost, false)
            this.paging.totalpage = this.productService.onGetMaxPage(this.paging.size, this.paging.step)
        }
      })
    }
  }

  AddToCart(product) {
    var ItemProduct =
    {
      Product: { 
        _id:product._id,
        ProductName:product.ProductName,
        Image:product.Image.LeftImage.IdUrl,
        ShortDescription: product.ShortDescription,
        Price:product.Price,
        Qty:1,
        Size:'40',
        Color:'red',
        },
    Promotion: {
        _id:product.Promotion[0]._id,
        PromotionName:product.Promotion[0]._id,
        Value:product.Promotion[0].Value,
        SaleEndDate: product.Promotion[0].SaleEndDate,
        TypePromotion:product.Promotion[0].TypePromotion,
        }
    }
    this.cartService.AddCart(ItemProduct).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.cartService.storage =
        {
          data:result.data,
          TotalData:{
            totalOrder:result.TotalData.totalOrder,
            totalQtyOrder:result.TotalData.totalQtyOrder,
          }
        }
        this.alertService.success(result.message)        
      }
    });
  }
  onChangePage(page) {
    this.paging.page = page;
    this.AllProduct( );
  }

  onDetail(idparam)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "Idproduct": idparam
      }
  };
  this.router.navigate(["detailproduct"], navigationExtras);
  }

  ngOnInit() {
    this.AllProduct();
  }
}
