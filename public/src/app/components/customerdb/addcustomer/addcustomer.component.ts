import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Service} from '../../../services/service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {
  message;
  messageClass;
  form: FormGroup;
  constructor(
    private FormBuilder: FormBuilder,
    private Service : Service,
    private Router : Router
  ) { 
    this.createForm();
  }
  createForm() {  
    this.form = this.FormBuilder.group({
       fullname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      address: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      birthday: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      numberphone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
    })
  }
  
  addcustomerSubmit() {
    const customer = {
      fullname: this.form.get('fullname').value,
      address: this.form.get('address').value,
      birthday: this.form.get('birthday').value,
      numberphone: this.form.get('numberphone').value,
    }
    
    this.Service.newcustomer(customer).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.Router.navigate(['/']); // Redirect to login view
        }, 2000);
      }
    });
  }

  ngOnInit() {
  }

}
