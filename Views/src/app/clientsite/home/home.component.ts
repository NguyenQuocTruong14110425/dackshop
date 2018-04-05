import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../webservice/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productpost
  constructor(
    private FormBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }
  AllProduct() {
    console.log("test main product");
    this.productService.getAllProducts().subscribe(result => {
        this.productpost = result.data;
    });
  }
  ngOnInit() {
    this.AllProduct();
  }
}
