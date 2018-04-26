import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../webservice/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  message;
  messageClass;
  processing = false;
  fullnameValid;
  fullnameMessage;
  addressValid;
  addressMessage;
  numberphoneValid;
  numberphonedMessage;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;
  constructor(
    private FormBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {

    this.createForm();
  }


  createForm() {
    this.form = this.FormBuilder.group({
      fullname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        this.validateFullname
      ])],
      address: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        this.validateAddress
      ])],
      numberphone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        this.validateNumberphone
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirmpassword: ['', Validators.required] // Field is required
    }, { validator: this.matchingPasswords('password', 'confirmpassword') });
  }

  disableForm() {
    this.form.controls['fullname'].disable();
    this.form.controls['address'].disable();
    this.form.controls['numberphone'].disable();
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirmpassword'].disable();
  }


  enableForm() {
    this.form.controls['fullname'].enable();
    this.form.controls['address'].enable();
    this.form.controls['numberphone'].enable();
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirmpassword'].enable();
  }
  validateFullname(controls) {
    const regExp =
      new RegExp(/^[a-zA-Z0-9\s]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateFullname': true }
    }
  }
  validateAddress(controls) {
    const regExp =
      new RegExp(/^[a-zA-Z0-9\s]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateAddress': true }
    }
  }
  validateNumberphone(controls) {
    const regExp =
      new RegExp(/^[0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateNumberphone': true }
    }
  }
  validateEmail(controls) {
    const regExp =
      new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true }
    }
  }

  validateUsername(controls) {
    const regExp =
      new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername': true }
    }
  }

  validatePassword(controls) {
    const regExp =
      new RegExp(/^(?=.*?[a-z])(?=.*?[\d])(?=.*?[\w]).{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      console.log('b');
      return { 'validatePassword': true }
    }
  }

  matchingPasswords(password, confirmpassword) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirmpassword].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }

  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      fullname: this.form.get('fullname').value,
      address: this.form.get('address').value,
      numberphone: this.form.get('numberphone').value,
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    }
    this.AuthService.registerUser(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to login view
        }, 2000);
      }
    });
  }


  checkEmail() {
    this.AuthService.checkEmail(this.form.get('email').value).subscribe(data => {
      if (!data.success) {
        this.emailValid = false;
        this.emailMessage = data.message;
      }else{
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }
  checkUsername() {
    this.AuthService.checkUsername(this.form.get('username').value).subscribe(data => {
      if (!data.success) {
        this.usernameValid = false;
        this.usernameMessage = data.message;
      }else{
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    });
  }
  ngOnInit() {
  }

}
