import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../webservice/order.service';
import { AuthService } from '../../webservice/auth.service';
import { AlertService } from '../../webservice/alert.service';
import { CartService } from '../../webservice/cart.service';
import { PaymentService } from '../../webservice/payment.service';
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
  profile = {
    FullName: '',
    Email: '',
    Address: '',
    NumberPhone: '',
    paymentMethod:''
  };
  total
  Cart: Object
  constructor(
    private FormBuilder: FormBuilder,
    private orderService: OrderService,
    private AuthService: AuthService,
    private alertService: AlertService,
    private cartService: CartService,
    private paymentService: PaymentService,
    private router: Router
  ) {
    // this.createForm();
    this.cartService.storage;
  }
  // createForm() {
  //       this.orderform = this.FormBuilder.group({
  //         paymentMethod: '',
  //       })
  // }

  getProfile() {
    this.AuthService.profile().subscribe(result => {
      if (!result.success) {
        this.alertService.error(result.message);
      } else {
        if(result!=null)
        {
          this.profile = result.data
        }
      }
    });
  }
  onOrderSubmit() {
    if (this.cartService.storage != undefined || this.cartService.storage != null) {
      this.Cart = {
        items: this.cartService.storage.data,
        totalOrder: this.cartService.storage.TotalData.totalOrder,
        totalQtyOrder: this.cartService.storage.TotalData.totalQtyOrder,
      }
    }
    this.cartService.getCartDetail((err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        if (this.cartService.storage != undefined || this.cartService.storage != null) {
          this.Cart = {
            items: this.cartService.storage.data,
            totalOrder: this.cartService.storage.TotalData.totalOrder,
            totalQtyOrder: this.cartService.storage.TotalData.totalQtyOrder,
          }
        }
        else {
          if (result != null || result != undefined) {
            this.Cart = {
              items: result.data,
              totalOrder: result.TotalData.totalOrder,
              totalQtyOrder: result.TotalData.totalQtyOrder,
            }
          }
          else {
            this.Cart = null;
          }

        }
      }
    })
    const order = {
      Cart: this.Cart,
      FullName: this.profile.FullName,
      Address: this.profile.Address,
      PhoneNumber: this.profile.NumberPhone,
      Email: this.profile.Email,
      paymentMethod: this.profile.paymentMethod
    }
    this.paymentService.PaymentCheckout(order).subscribe(result => {
        if (!result.success) {
          this.alertService.error(result.message);
          // window.location.href ='https://sandbox.nganluong.vn:8088/nl30/checkout/version31/index/token_code/64794-b9d1215f29350f0e8f6fe3f655ee9e5e'
        } else {
          console.log(result)
          // this.alertService.success(result.message)
          window.location.href = result.data;
        }
      });
    // this.orderService.createOrder(order).subscribe(result => {
    //   if (!result.success) {
    //     this.alertService.error(result.message);
    //   } else {
    //     this.alertService.success(result.message)
    //     this.removeAllCart();
    //     this.router.navigate(["home"]);
    //   }
    // });
  }
  removeAllCart() {
    this.cartService.getreRemoveAllCart((err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        this.alertService.success(result.message)
        if (this.cartService.storage != undefined || this.cartService.storage != null) {
          this.cartpost = this.cartService.storage.data;
          this.total = this.cartService.storage.TotalData;
        }
        else {
          console.log(result)
          this.cartpost = result.data;
          this.total = result.TotalData;
        }
      }
    });
  }
  removeItemCart(idProduct) {
    this.cartService.getremoveItemCart(idProduct, (err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        this.alertService.success(result.message)
        if (this.cartService.storage != undefined || this.cartService.storage != null) {
          this.cartpost = this.cartService.storage.data;
          this.total = this.cartService.storage.TotalData;
        }
        else {
          this.cartpost = result.data;
          this.total = result.TotalData;
        }
      }
    });
  }
  //
  reduceItemCart(idProduct) {
    this.cartService.getreduceItemCart(idProduct, (err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        this.alertService.success(result.message)
        if (this.cartService.storage != undefined || this.cartService.storage != null) {
          this.cartpost = this.cartService.storage.data;
          this.total = this.cartService.storage.TotalData;
        }
        else {
          this.cartpost = result.data;
          this.total = result.TotalData;
        }
      }
    });
  }
  //
  increaseItemCart(idProduct) {
    this.cartService.getincreaseItemCart(idProduct, (err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        this.alertService.success(result.message)
        if (this.cartService.storage != undefined || this.cartService.storage != null) {
          this.cartpost = this.cartService.storage.data;
          this.total = this.cartService.storage.TotalData;
        }
        else {
          this.cartpost = result.data;
          this.total = result.TotalData;
        }
      }
    });
  }
  gettoCart() {
    this.cartService.getCartDetail((err, result) => {
      if (err) {
        this.alertService.error(err);
      } else {
        if (this.cartService.storage != undefined || this.cartService.storage != null) {
          this.cartpost = this.cartService.storage.data;
          this.total = this.cartService.storage.TotalData;
        }
        else {
          if(result)
          {
            this.cartpost = result.data;
            this.total = result.TotalData;
          }
        }
      }
    })
  }

  ngOnInit() {
    this.getProfile();
    this.gettoCart();
  }
}
