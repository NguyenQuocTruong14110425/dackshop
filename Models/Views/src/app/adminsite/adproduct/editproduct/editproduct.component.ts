import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../../../webservice/product.service';
import { CatalogService } from '../../../webservice/catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  processing= false;
  loading = true;
  product;
  catalogposts: any;
  message;
  messageClass;
  currentUrl;
  form: FormGroup;
  constructor(
    private FormBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private catalogService: CatalogService,
    private router: Router,
    private location: Location
  ) {   this.createForm();}
  createForm() {  
    this.form = this.FormBuilder.group({
      nameproduct: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500),
        this.validatenameproduct
      ])],
      shortdescription: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4000),
        this.validatedescriptionproduct
        
      ])],
      longdescription: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4000),
        this.validatedescriptionproduct
        
      ])]
    })
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
  updateproductSubmit() {
    this.processing = true; // Lock form fields
    // Function to send blog object to backend
    this.productService.editProduct(this.product).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(['/add']); // Navigate back to route page
        }, 2000);
      }
    });
  }
  getAllCatalogs() {
    // Function to GET all blogs from database
    this.catalogService.GetAllCatalog().subscribe(result => {
      this.catalogposts = result.data; // Assign array to use in HTML
      this.message = result.message;
      console.log(this.message);
    });
  }
  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.getAllCatalogs();
    // this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // // Function to GET current blog with id in params
    // this.productService.getSingleProduct(this.currentUrl.id).subscribe(result => {
    //   // Check if GET request was success or not
    //   if (!result.message) {
    //     this.messageClass = 'alert alert-danger'; // Set bootstrap error class
    //     this.message = 'product not found.'; // Set error message
    //   } else {
    //     this.product = result.data; // Save blog object for use in HTML
    //     this.loading = false; // Allow loading of blog form
    //     console.log(this.product);
    //   }
    // });
  }

}