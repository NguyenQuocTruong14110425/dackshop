import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../webservice/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  message;
  messageClass;
  profiles;
  constructor(
    private FormBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) { this.createForm(); }

  createForm() {
    this.form = this.FormBuilder.group({
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
      ])]
    });
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
      return { 'validatePassword': true }
    }
  }
  onLoginSubmit() {
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    }
    this.AuthService.loginUser(user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        window.location.reload();
        this.router.navigate(['/home']); // Redirect to login view
      }
    });
  };



  ngOnInit() {
  }

}
