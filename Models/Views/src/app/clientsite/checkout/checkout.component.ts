import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { OrderService } from '../../webservice/order.service';
import { CartService } from '../../webservice/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderform: FormGroup
  ordermessage;
  messageClass;
  cartpost;
  total
  constructor(
    private FormBuilder: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) { this.createForm(); }

  createForm() {
    this.orderform = this.FormBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      address: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
      ])],
      paymentcard: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ])]
    })
  }
  //
  reduceItemCart(idProduct){
    this.cartService.reduceItemCart(idProduct).subscribe(data => {
      if (data.success==false) {
        this.ordermessage = data.message;

      } else {
        this.ordermessage = data.message;
        this.gettoCart();
      }
    });
  }
    //
    increaseItemCart(idProduct){
      this.cartService.increaseItemCart(idProduct).subscribe(data => {
        if (data.success==false) {
          this.ordermessage = data.message;
        } else {
          this.ordermessage = data.message;
          this.gettoCart();
        }
      });
    }

  onOrderSubmit()
  {
    this.cartService.shoppingcart().subscribe(data => {
      if (data.success==false) {
        this.messageClass = 'alert alert-danger';
        this.ordermessage = data.message;
      } else {
        const order = {
          name: this.orderform.get('name').value,
          address: this.orderform.get('address').value,
          phone: this.orderform.get('phone').value,
          paymentcard: this.orderform.get('paymentcard').value,
          dateorder:new Date()
        }
        const product = {
          amountproduct: data.products.qty
        }
        this.orderService.Checkout(order).subscribe(data1 => {
          console.log(data1);
          if (!data1.success) {
            this.messageClass = 'alert alert-danger';
            this.ordermessage = data1.message;
          } else {
            this.messageClass = 'alert alert-success';
            this.ordermessage = data1.message;
            window.location.reload();
          }
        });
      }
    });
   
  }
  gettoCart() {
    console.log("test cart bag");
    this.cartService.shoppingcart().subscribe(data => {
      if (data.success==false) {
        this.messageClass = 'alert alert-danger';
        this.ordermessage = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.ordermessage = data.message;
        this.cartpost = data.products;
        this.total=data.totalPrice;
        console.log(data);
      }
    });
  }
  
  ngOnInit() {
    this.gettoCart();
  }
}
