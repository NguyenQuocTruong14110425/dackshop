import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../webservice/order.service';
import { ProductService } from '../../webservice/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  orderpost;
  formsearch: FormGroup
  products;
  orderstatus=false;
  orderdetailstatus=false;
  messageClass;
  message;
  orderdetail;
  constructor(
    private FormBuilder: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router
  ) { this.createForm(); }
  createForm() {
    this.formsearch = this.FormBuilder.group({
      checkorder: ['', Validators.compose([
        Validators.maxLength(50)
      ])],
    });
  }
  GetphoneForOrder(phone) {
    this.orderdetailstatus=false;
    this.orderService.getDetailOrder(phone).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.orderstatus=false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.orderstatus=true;
        this.orderpost = data.orders;
      }
    });
  }
  GetdetailOrder(idorder) {
    this.orderstatus=false;
    let resulf=[];
    this.orderService.getDetailOrder(idorder).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.orderdetailstatus=false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.orderdetailstatus=true;
        this.orderdetail = data.orders;
        for(let key in data.products)
        {
          this.productService.getSingleProduct(data.products[key].item._id).subscribe(dataproduct => {
            if (!dataproduct.success) {
              this.messageClass = 'alert alert-warning';
              this.message = dataproduct.message;
            } else {
              resulf.push({value:dataproduct.product,qty:data.products[key].qty,subprice:data.products[key].price}); // Save blog object for use in HTML           
            }
            console.log(data.products[key]);
        });
        }
        this.products = resulf;
      }
    });
  }
  ngOnInit() {
  }

}
