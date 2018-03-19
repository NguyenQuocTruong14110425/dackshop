import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../webservice/order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './adorder.component.html',
  styleUrls: ['./adorder.component.css']
})
export class AdorderComponent implements OnInit {
  orderpost
  constructor(
    private FormBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) { }
  // Function to get all blogs from the database
  GetListOrder() {
    // Function to GET all blogs from database
    this.orderpost.listorder().subscribe(data => {
      this.orderpost = data.orders; // Assign array to use in HTML
      console.log(data);
    });
  }
  ngOnInit() {
    this.GetListOrder();
  }

}
