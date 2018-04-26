import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../../webservice/order.service';
import { ProductService } from '../../../webservice/product.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  orderpost;
  currentUrl;
  messageClass;
  message;
  products
  loadingOrders = false;
  constructor(
    private FormBuilder: FormBuilder,
    private orderService: OrderService,
    private productService:ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  GetListOrder() {
    // Function to GET all blogs from database
    const idorder = this.currentUrl.idorder;
    console.log(idorder)
    let resulf=[];
    let qty=[];
    this.orderService.getDetailOrder(idorder).subscribe(data => {
      this.orderpost = data.orders;
      for(let key in data.products)
      {
        this.productService.getSingleProduct(data.products[key].item._id).subscribe(dataproduct => {
          console.log(dataproduct);
          if (!dataproduct.success) {
            this.messageClass = 'alert alert-warning';
            this.message = dataproduct.message;
          } else {
            resulf.push({value:dataproduct.product,qty:data.products[key].qty,subprice:data.products[key].price}); // Save blog object for use in HTML           
          }
      });
      }
      this.products = resulf;
      console.log(this.orderpost);
      console.log(this.products);
    });
  }
  UpdateStatusShip(id,status) {
    if(status=="shipping order")
    {
      status = "complete"
    }
    if(status=="process order")
    {
      status = "shipping order"
    }
    this.orderService.updateorder(id,status).subscribe(data => {
      console.log(data);
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.GetListOrder;
      }
    });
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.GetListOrder();
  }

}
