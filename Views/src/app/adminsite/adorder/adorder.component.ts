import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../webservice/alert.service';
import { OrderService } from '../../webservice/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './adorder.component.html',
  styleUrls: ['./adorder.component.css']
})
export class AdorderComponent implements OnInit {
  formOrder: FormGroup
  OrderPost;
  DetailOrder: any;
  isDetailOrder = true;
  constructor(
    private FormBuilder: FormBuilder,
    private orderService: OrderService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private router: Router
  ) {
    this.createFormOrder();
  }
  //open modal
  opencreate(createOrder) {
    const modalRefCreate = this.modalService.open(createOrder);
    modalRefCreate.result.then((data) => {
      this.onCreateOrderSubmit();
    }, (reason) => {
      this.GetListOrder();
    });
  }
  //open modal
  opendetail(ordermodal,idOrder) {
    const modalRefCreate = this.modalService.open(ordermodal);
    this.detailOrder(idOrder);
    modalRefCreate.result.then((data) => {
      this.updateOrderSubmit();
    }, (reason) => {
      this.GetListOrder();
    });
  }
  //Order
  createFormOrder() {
    this.formOrder = this.FormBuilder.group({
      FullName: '',
      Email: '',
      Address: '',
      PhoneNumber: '',
      PaymentType: '',
      Shipping: '',
    })
  }
  onCreateOrderSubmit() {
    const Order = {
      FullName: this.formOrder.get('FullName').value,
      Email: this.formOrder.get('Email').value,
      Address: this.formOrder.get('Address').value,
      Gender: this.formOrder.get('Gender').value,
      Age: this.formOrder.get('Age').value,
      NumberPhone: this.formOrder.get('NumberPhone').value,
      OrderName: this.formOrder.get('OrderName').value,
      Password: this.formOrder.get('Password').value,
    }
    this.orderService.createOrder(Order).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.GetListOrder();
        this.createFormOrder();
      }
    });
  }
  updateOrderSubmit() {
    this.orderService.updateOrder(this.DetailOrder).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.detailOrder(result.data._id)
        this.GetListOrder();
      }
    });
  }
  DeleteOrder(id) {
    this.orderService.deleteOrder(id).subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        this.alertService.success(result.message)
        this.GetListOrder();
        this.isDetailOrder = true;
        this.DetailOrder = null;
      }
    });
  }
  detailOrder(id) {
    this.orderService.getDetailOrder(id).subscribe(result => {
      this.DetailOrder = result.data;
      this.isDetailOrder = true;
    });
  }
  EditOrder() {
    this.isDetailOrder = false
  }
  GetListOrder() {
    this.orderService.getListOrder().subscribe(result => {
      this.OrderPost = result.data;
      console.log(this.OrderPost)
    });
  }
  ngOnInit() {
    this.GetListOrder();
  }


}
