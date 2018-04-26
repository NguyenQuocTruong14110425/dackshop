import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../webservice/product.service';
import { CatalogService } from '../../webservice/catalog.service';
@Component({
  selector: 'app-adproduct',
  templateUrl: './adproduct.component.html',
  styleUrls: ['./adproduct.component.scss']
})
export class AdproductComponent implements OnInit {
  catalogposts: any;
  productposts: any;
  newProduct = false;
  message;
  messageClass;
  processing= false;
  productMessage;

  form: FormGroup;
  constructor(
    private FormBuilder: FormBuilder,
    private productService: ProductService,
    private catalogService: CatalogService,
    private router: Router,
    private location: Location
  ) {

    this.createForm();
  }
  createForm() {  
    this.form = this.FormBuilder.group({
      nameproduct: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500),
        this.validatenameproduct
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4000),
        this.validatedescriptionproduct
        
      ])],
      price: ['', Validators.compose([
        Validators.required,
        Validators.min(1),
        this.validatepriceproduct
       
      ])],
      leftimage: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        
      ])],
      leftimagezoom: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        
      ])],
      underimage: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        
      ])],
      underimagezoom: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        
      ])],
      behindimage: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        
      ])],
      behindimagezoom: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        
      ])],
      color: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        
      ])],
      size: ['', Validators.compose([
        Validators.required,
        Validators.min(30),
        Validators.max(50)
        
      ])],
      catalog: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),      
      ])],
      amountproduct: ['', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(1000),      
      ])],
      checksale: [false]
    });
    
  }
  validatenameproduct(controls) {
    const regExp =
      new RegExp(/^[a-zA-Z0-9\s]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatenameproduct': true }
    }
  }
  validatedescriptionproduct(controls) {
    const regExp =
      new RegExp(/^[a-zA-Z0-9\s]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatedescriptionproduct': true }
    }
  }
  validatepriceproduct(controls) {
    const regExp =
      new RegExp(/^[0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatepriceproduct': true }
    }
  }
  // Function to display new blog form
  newProductForm() {
    this.newProduct = true; // Show new blog form
  }
  
  goBack() {
    this.location.back(); // Clear all variable states
  }
  getAllProducts() {
    console.log("test main product");
    this.productService.getAllProducts().subscribe(result => {
        this.productposts = result.data;
    });
  }
  getAllCatalogs() {
    // Function to GET all blogs from database
    this.catalogService.GetAllCatalog().subscribe(data => {
      console.log("test");
      this.catalogposts = data.catalogs; // Assign array to use in HTML
      console.log(data.catalogs);
    });
  }
  addproductSubmit() {
    this.processing = true;
    const product = {
      nameproduct: this.form.get('nameproduct').value,
      description: this.form.get('description').value,
      price: this.form.get('price').value,
      leftimage: this.form.get('leftimage').value,
      leftimagezoom: this.form.get('leftimagezoom').value,
      underimage: this.form.get('underimage').value,
      underimagezoom: this.form.get('underimagezoom').value,
      behindimage: this.form.get('behindimage').value,
      behindimagezoom: this.form.get('behindimagezoom').value,
      color: this.form.get('color').value,
      size: this.form.get('size').value,
      catalog: this.form.get('catalog').value,
      checksale: true,
      amountproduct:this.form.get('amountproduct').value,
      promotion: this.form.get('checksale').value,
    }
    
    this.productService.addproduct(product).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/home']); // Redirect to login view
        }, 2000);
      }
    });
  }

  onDeleteProductsubmit(id:string) {
    console.log(id);
    this.productService.deleteProduct(id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllProducts();
      }
    });
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCatalogs();
  }

}
