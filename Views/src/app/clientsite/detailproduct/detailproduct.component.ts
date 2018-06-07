import { Component, ElementRef, Inject, OnInit, Output, Input, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../../webservice/product.service';
import { CartService } from '../../webservice/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { AlertService } from '../../webservice/alert.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbRatingConfig, NgbProgressbarConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TotalProductPipe } from '../../pipe/productpipe.pipe';
import { AuthService } from '../../webservice/auth.service';
@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.scss']
})
export class DetailproductComponent implements OnInit {
  formDetailProduct: FormGroup
  formComment: FormGroup
  product: any;
  currentUrl: { [key: string]: any; };
  Idproduct;
  IsChangeSize;
  progress = false;
  IsChangeColor;
  IsChangQty = 1;
  currentRate = 3;
  commentRatePost = 1;
  productpost;
  commentpost;
  profile;
  paging = {
    step: 5,
    page: 1,
    size: 200,
    totalpage: []
  }
  pagingComment = {
    step: 3,
    page: 1,
    size: 200,
    totalpage: []
  }
  constructor(
    private FormBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private routeActivatedRoute: ActivatedRoute,
    private totalPipe: TotalProductPipe,
    private modalService: NgbModal,
    private AuthService: AuthService,
    config: NgbRatingConfig,
    configProgress: NgbProgressbarConfig
  ) {
    this.createFormComment();
    config.max = 5;
    configProgress.max = 100;
    configProgress.striped = true;
    configProgress.animated = true;
    configProgress.type = 'success';
    this.routeActivatedRoute.queryParams.subscribe(params => {
      this.Idproduct = params["Idproduct"];
    });
  }
  createFormComment() {
    this.formComment = this.FormBuilder.group({
      comment: ''
    })
  }
  //open modal
  openComment(commentmodal) {
    const modalRefCreate = this.modalService.open(commentmodal);
    modalRefCreate.result.then((data) => {
      this.OnSubmitComment();
      this.createFormComment();
      this.commentRatePost = 1;
    }, (reason) => {
      this.GetListComment();
    });
  }
  OnSubmitComment() {
    var DataComment =
      {
        _id: this.product._id,
        Comment:
          {
            User: this.profile,
            Content: this.formComment.get('comment').value,
            DatePosted: new Date(),
            Image: '',
            RateComment: this.commentRatePost,
            Rate: 0,
          }
      }
    this.productService.commentProduct(DataComment).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.commentpost = result.data.Comment;
        this.product = result.data;
        this.product.Rate = this.getRateAvg(this.product.Rate);
        this.pagingComment.size = this.product.Rate.TotalRate;
        this.pagingComment.totalpage = this.productService.onGetMaxPage(this.pagingComment.size, this.pagingComment.step)
      }
    });
  }
  GetListComment() {
    this.getDetailProduct();
    this.commentpost = this.product.Comment;
    this.product.Rate = this.getRateAvg(this.product.Rate);
    this.pagingComment.size = this.product.Rate.TotalRate;
    this.pagingComment.totalpage = this.productService.onGetMaxPage(this.pagingComment.size, this.pagingComment.step)
  }
  Profile() {
    this.AuthService.profile().subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.profile = result.data
      }
    });
  }
  AddToCart() {
    var ItemProduct =
      {
        Product: {
          _id: this.product._id,
          ProductName: this.product.ProductName,
          Image: this.product.Image.LeftImage.IdUrl,
          ShortDescription: this.product.ShortDescription,
          Price: this.product.Price,
          Qty: this.IsChangQty > 0 ? this.IsChangQty : 1,
          Size: this.IsChangeSize,
          Color: this.IsChangeColor
        },
        Promotion: {
          _id: this.product.Promotion ? this.product.Promotion[0]._id : '',
          PromotionName: this.product.Promotion ? this.product.Promotion[0].PromotionName : '',
          Value: this.product.Promotion ? this.product.Promotion[0].Value : 0,
          SaleEndDate: this.product.Promotion ? this.product.Promotion[0].SaleEndDate : null,
          TypePromotion: this.product.Promotion ? this.product.Promotion[0].TypePromotion : '',
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
  changeColor(idColor) {
    this.IsChangeColor = idColor;
  }
  changeSize(idSize) {
    this.IsChangeSize = idSize;
  }
  ChangeQty(event) {
    if (event == -1) {
      this.IsChangQty > 0 ? this.IsChangQty-- : 1
    }
    if (event == 1) {
      this.IsChangQty < 500 ? this.IsChangQty++ : 500
    }
  }
  onChangePage(page) {
    this.pagingComment.page = page;
    this.commentpost;
  }
  getRateAvg(rateData) {
    var objRate={
      OneStar:0,
      TwoStar:0,
      ThreeStar:0,
      FourStar:0,
      FiveStar:0,
      TotalRate:rateData.TotalRate,
      AvgRate:0
    };
    if(rateData.TotalRate != 0)
    {
      objRate.OneStar = Math.round( (rateData.OneStar/rateData.TotalRate)*100)
      objRate.TwoStar = Math.round( (rateData.TwoStar/rateData.TotalRate)*100)
      objRate.ThreeStar = Math.round( (rateData.ThreeStar/rateData.TotalRate)*100)
      objRate.FourStar = Math.round( (rateData.FourStar/rateData.TotalRate)*100)
      objRate.FiveStar = Math.round( (rateData.FiveStar/rateData.TotalRate)*100)
      var result = (
        rateData.OneStar * 1 +
        rateData.TwoStar * 2 +
        rateData.ThreeStar * 3 + 
        rateData.FourStar * 4 + 
        rateData.FiveStar * 5
      ) / rateData.TotalRate
      objRate.AvgRate = Math.round(result)

    }
    return objRate;
  }
  getDetailProduct() {
    this.progress = true;
    this.productService.getSingleProduct(this.Idproduct).subscribe(result => {
      this.product = result.data;
      this.commentpost = result.data.Comment;
      this.product.Rate = this.getRateAvg(this.product.Rate);
      this.pagingComment.size = this.product.Rate.TotalRate;
      this.pagingComment.totalpage = this.productService.onGetMaxPage(this.pagingComment.size, this.pagingComment.step)
      this.progress = false;
    });
  }
  AllProduct() {
    this.progress = true;
    if (this.productService.CheckExitProduct() == 1) {
      this.productpost = this.productService.Listproduct;
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

  ngOnInit() {
    this.AllProduct();
    this.currentRate;
    this.commentRatePost;
    this.getDetailProduct();
  }

}
