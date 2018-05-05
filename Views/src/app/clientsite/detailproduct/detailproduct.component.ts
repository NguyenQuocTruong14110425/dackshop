import { Component, ElementRef, Inject, OnInit, Output, Input, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../../webservice/product.service';
import { CartService } from '../../webservice/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { AlertService } from '../../webservice/alert.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {
  formDetailProduct: FormGroup
  product: any;
  currentUrl: { [key: string]: any; };
  Idproduct;
  IsChangeSize;
  IsChangeColor;
  IsChangQty =1;
  constructor(
    private FormBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private routeActivatedRoute: ActivatedRoute
  ) {
    this.routeActivatedRoute.queryParams.subscribe(params => {
      this.Idproduct = params["Idproduct"];
    });
  }

  AddToCart() {
    var ItemProduct =
    {
      Product: { 
        _id:this.product._id,
        ProductName:this.product.ProductName,
        Image:this.product.Image.LeftImage.IdUrl,
        ShortDescription: this.product.ShortDescription,
        Price:this.product.Price,
        Qty:this.IsChangQty>0?this.IsChangQty:1,
        Size:this.IsChangeSize,
        Color:this.IsChangeColor
        },
    Promotion: {
        _id:this.product.Promotion[0]._id,
        PromotionName:this.product.Promotion[0]._id,
        Value:this.product.Promotion[0].Value,
        SaleEndDate: this.product.Promotion[0].SaleEndDate,
        TypePromotion:this.product.Promotion[0].TypePromotion,
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
  changeColor(idColor){
    this.IsChangeColor =idColor;
  }
  changeSize(idSize){
    this.IsChangeSize =idSize;
  }
  ChangeQty(event)
  {
    if(event==-1)
    {
      this.IsChangQty>0?this.IsChangQty--:1
    }
    if(event==1)
    {
      this.IsChangQty<500?this.IsChangQty++:500
    }
  }
  getDetailProduct() {
    this.productService.getSingleProduct(this.Idproduct).subscribe(result => {
      this.product = result.data;
    });
  }
  ngOnInit() {
    this.getDetailProduct();
  }

}
